---
name: api-integration
description: Guides API integration rules for React + TypeScript projects. Use when applying axios / TanStack Query / Zustand / React Hook Form + Zod layer separation principles. Triggers for any situation requiring API file creation, hook writing, form schema definition, or state management role separation.
---

# API Integration Rules

The data layer in this project is strictly separated into **4 roles**.

| Layer        | Tool                  | Role                                          |
| ------------ | --------------------- | --------------------------------------------- |
| HTTP         | axios                 | Actual request/response to server             |
| Server state | TanStack Query        | Caching, synchronization, loading/error state |
| Client state | Zustand               | UI state, global app state                    |
| Form state   | React Hook Form + Zod | Input values, validation                      |

---

## 1. axios — API Layer

### Rules

- **All API calls must be separated as functions in `src/api/{domain}.ts`**
- **Directly importing or calling axios from components or hooks is prohibited**
- Use only the centralized instance from `src/lib/axios.ts`
- API functions handle only request/response (no side effects)
- Request/response types must be explicitly declared with generics

### File Structure

```text
src/
  lib/
    axios.ts          # instance, interceptor config
  api/
    auth.ts           # auth-related API
    posts.ts          # posts-related API
    users.ts          # users-related API
```

### axios Instance (`src/lib/axios.ts`)

```ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // common error handling (401 refresh, etc.)
    return Promise.reject(error);
  },
);
```

### API Function Example (`src/api/posts.ts`)

```ts
import { apiClient } from "@/lib/axios";
import type { Post, CreatePostRequest, CreatePostResponse } from "@/features/post/types";

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await apiClient.get<Post[]>("/posts");
  return data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
};

export const createPost = async (body: CreatePostRequest): Promise<CreatePostResponse> => {
  const { data } = await apiClient.post<CreatePostResponse>("/posts", body);
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};
```

### Prohibited Patterns

```ts
// ❌ direct call from component
import axios from "axios";
const res = await axios.get("/posts");

// ❌ direct call from hook
import { apiClient } from "@/lib/axios";
const res = await apiClient.get("/posts"); // direct use from hook is prohibited

// ✅ call only through API layer function
import { getPosts } from "@/api/posts";
```

---

## 2. TanStack Query — Server State

### Rules

- **Server data caching, loading/error state must be managed with TanStack Query**
- Wrap in a custom hook: `src/features/{feature}/hooks/use{Domain}{Action}.ts`
- Centralize `queryKey` as constants in the domain file
- Call only API layer functions in `queryFn` (direct axios use prohibited)
- After `useMutation` success, always invalidate related queries with `invalidateQueries`
- Simple queries can use `useQuery` directly in components. Separate into a custom hook if there is shared logic (parameter processing, staleTime config, etc.)
- Always separate `useMutation` into a custom hook

### queryKey Rules

```ts
// src/features/post/queries/postQueryKeys.ts
export const postQueryKeys = {
  all: ["posts"] as const,
  lists: () => [...postQueryKeys.all, "list"] as const,
  list: (filters?: PostFilters) => [...postQueryKeys.lists(), filters] as const,
  details: () => [...postQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...postQueryKeys.details(), id] as const,
};
```

### useQuery Hook Example (`src/features/post/hooks/usePostList.ts`)

```ts
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";
import { postQueryKeys } from "../queries/postQueryKeys";

export const usePostList = () => {
  return useQuery({
    queryKey: postQueryKeys.lists(),
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
```

### useMutation Hook Example (`src/features/post/hooks/useCreatePost.ts`)

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts";
import { postQueryKeys } from "../queries/postQueryKeys";
import type { CreatePostRequest } from "../types";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePostRequest) => createPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};
```

### Component Usage Example

```tsx
// ✅ simple query — can be used directly in component
const { data: posts, isLoading } = useQuery({
  queryKey: postQueryKeys.lists(),
  queryFn: getPosts,
});

// ✅ separate into custom hook if there is shared logic (staleTime, select, enabled, etc.)
const { data: posts, isLoading } = usePostList();

// ✅ always separate mutation into a custom hook
const { mutate: createPost, isPending } = useCreatePost();

// ❌ do not write queryKey as a string literal (must use queryKeys constants)
const { data } = useQuery({ queryKey: ["posts"], queryFn: getPosts });
```

### invalidateQueries Strategy

Decide which queries to invalidate after mutation success based on the scope of impact.

| Situation | Strategy |
|-----------|----------|
| Affects list (create/delete) | invalidate `lists()` key |
| Affects specific item only (update) | invalidate `detail(id)` key |
| Affects both list and detail | invalidate `all` key (batch with parent key) |

```ts
// create → invalidate list
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
},

// update → invalidate specific detail
onSuccess: (_, variables) => {
  queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(variables.id) });
},

// delete → invalidate list + detail
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
},
```

### onSuccess Post-Processing

UI post-processing after mutation success (routing, toast, closing modals, etc.) **is performed in `onSuccess`.**
Distinguish between the hook's internal `onSuccess` and the `onSuccess` passed to `mutate` in components based on responsibility.

| Location | Responsibility |
|----------|----------------|
| Hook's internal `onSuccess` | Data layer post-processing: cache invalidation, global state updates, etc. |
| Component `mutate(..., { onSuccess })` | UI post-processing: toast notifications, closing modals, page navigation, etc. |

```ts
// ✅ hook: data post-processing
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};

// ✅ component: UI post-processing
const { mutate: createPost } = useCreatePost();

const onSubmit = (values: CreatePostFormValues) => {
  createPost(values, {
    onSuccess: () => {
      toast.success('Post has been created.');
      navigate('/posts');
    },
    onError: (error) => {
      toast.error('Failed to submit.');
    },
  });
};
```

---

## 3. Zustand — Client State

### Role Separation with TanStack Query

| State Type                                    | Correct Tool                     |
| --------------------------------------------- | -------------------------------- |
| Data fetched from server                      | TanStack Query                   |
| Loading/error state of server data            | TanStack Query                   |
| UI state (modal open, tab selection, etc.)    | Zustand                          |
| Global app state (auth, theme, etc.)          | Zustand                          |
| Client-only state shared across components    | Zustand                          |
| Caching or syncing server data locally        | ❌ Zustand prohibited, use Query |

### Rules

- **Do not store server state in Zustand** (Query already manages caching)
- **Do not copy TanStack Query data to Zustand** — the pattern of `set`ting `data` to the store via `useEffect` is prohibited
- Mutate state directly with `set`; use `immer` middleware when needed
- Stores are located at `src/stores/{domain}Store.ts`
- Separate stores by domain (one massive global store is prohibited)
- Do not store sensitive information such as auth tokens in the store

### Store Example (`src/stores/uiStore.ts`)

```ts
import { create } from "zustand";

interface UiState {
  isCreatePostModalOpen: boolean;
  openCreatePostModal: () => void;
  closeCreatePostModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isCreatePostModalOpen: false,
  openCreatePostModal: () => set({ isCreatePostModalOpen: true }),
  closeCreatePostModal: () => set({ isCreatePostModalOpen: false }),
}));
```

### Auth Store Example (`src/stores/authStore.ts`)

```ts
import { create } from "zustand";

interface AuthState {
  userId: number | null;
  isAuthenticated: boolean;
  setAuth: (userId: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isAuthenticated: false,
  setAuth: (userId) => set({ userId, isAuthenticated: true }),
  clearAuth: () => set({ userId: null, isAuthenticated: false }),
}));
```

### Prohibited Patterns

```ts
// ❌ storing server data in Zustand
const usePostStore = create(() => ({
  posts: [], // prohibited: server data is managed by Query
  fetchPosts: async () => {
    /* axios call */
  }, // prohibited
}));

// ❌ copying Query data to Zustand (causes sync issues)
const { data } = usePostList();
useEffect(() => {
  if (data) usePostStore.getState().setPosts(data); // prohibited
}, [data]);

// ✅ server data via Query, only UI state in Zustand
const { data: posts } = usePostList(); // Query
const { isModalOpen } = useUiStore(); // Zustand
```

---

## 4. React Hook Form + Zod — Form State

### Rules

- **All form state must be managed with React Hook Form** (`useState`-based forms prohibited)
- **Validation must be defined with Zod schema** (inline validate function prohibited)
- Schema is located at `src/features/{feature}/schemas/{formName}.schema.ts`
- Share API request types and form schema as much as possible (`z.infer<typeof schema>`)
- Call mutate in `onSubmit` when connecting `useMutation` with `handleSubmit`
- Define error messages in the schema (hardcoding in components is prohibited)

### File Structure

```text
src/features/post/
  schemas/
    createPost.schema.ts
  hooks/
    useCreatePost.ts     # useMutation hook
  components/
    CreatePostForm.tsx
```

### Zod Schema Definition (`src/features/post/schemas/createPost.schema.ts`)

```ts
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required.").max(100, "Title must be 100 characters or less."),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters.")
    .max(5000, "Content must be 5000 characters or less."),
  category: z.enum(["FREE", "QUESTION", "NOTICE"], {
    required_error: "Please select a category.",
  }),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
```

### Form Component (`src/features/post/components/CreatePostForm.tsx`)

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, type CreatePostFormValues } from "../schemas/createPost.schema";
import { useCreatePost } from "../hooks/useCreatePost";

export const CreatePostForm = () => {
  const { mutate: createPost, isPending } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "FREE",
    },
  });

  const onSubmit = (values: CreatePostFormValues) => {
    createPost(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Title" />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea {...register("content")} placeholder="Content" />
      {errors.content && <p>{errors.content.message}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
```

### Sharing API Types and Schema

```ts
// derive type from schema and reuse as API request type
import type { CreatePostFormValues } from "../schemas/createPost.schema";

// API function signature
export const createPost = async (body: CreatePostFormValues): Promise<Post> => {
  const { data } = await apiClient.post<Post>("/posts", body);
  return data;
};
```

### Prohibited Patterns

```tsx
// ❌ managing form state with useState
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

// ❌ inline validation
<input
  {...register("title", {
    required: "Title is required.", // prohibited: must be defined in schema
    maxLength: { value: 100, message: "..." },
  })}
/>;

// ❌ writing validate function directly without schema
resolver: async (values) => {
  /* direct validation logic */
};
```

---

## 5. Error Handling Rules

Error handling responsibilities are separated by layer.

| Layer | Scope | Method |
|-------|-------|--------|
| axios interceptor | Common HTTP errors (401, 403, 500, etc.) | `interceptors.response` |
| TanStack Query | Per-query/mutation error state | `isError`, `error`, `onError` |
| Component | UI error display (toast, error message) | `mutate(..., { onError })` |

### axios Interceptor — Common Error Handling

```ts
apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // token expired → refresh or logout
    }
    if (error.response?.status === 403) {
      // handle forbidden
    }
    return Promise.reject(error);
  },
);
```

### useQuery Error Handling

```tsx
const { data, isError, error } = useQuery({
  queryKey: postQueryKeys.lists(),
  queryFn: getPosts,
});

if (isError) return <ErrorMessage message={error.message} />;
```

### useMutation Error Handling

```ts
// hook: common error handling
export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onError: (error: AxiosError) => {
      // only handle in hook if common processing is needed
      console.error('Failed to create post:', error);
    },
  });
};

// component: UI error handling
createPost(values, {
  onError: () => toast.error('Failed to submit.'),
});
```

### Rules

- **axios interceptors handle only common HTTP errors** (do not swallow all errors)
- **Do not catch Query errors directly with `try/catch`** — use `isError` / `onError`
- Apply `ErrorBoundary` at the page level
- Explicitly type API error responses as `AxiosError<ErrorResponse>`

---

## Full Data Flow Summary

```text
Component
  └─ useForm (React Hook Form)      ← form input values, validation
  └─ useUiStore (Zustand)           ← UI state
  └─ usePostList (TanStack Query)   ← read server data
       └─ getPosts (axios API fn)   ← HTTP request
  └─ useCreatePost (TanStack Query) ← write server data
       └─ createPost (axios API fn) ← HTTP request
```
