---
name: api-integration
description: React + TypeScript 프로젝트의 API 연동 규칙을 안내한다. axios / TanStack Query / Zustand / React Hook Form + Zod 계층 분리 원칙을 적용해야 할 때 사용한다. API 파일 생성, 훅 작성, 폼 스키마 정의, 상태 관리 역할 분리가 필요한 모든 상황에서 트리거한다.
---

# API Integration 규칙

이 프로젝트의 데이터 계층은 **4가지 역할**로 엄격히 분리된다.

| 계층            | 도구                  | 역할                         |
| --------------- | --------------------- | ---------------------------- |
| HTTP 통신       | axios                 | 서버와의 실제 요청/응답      |
| 서버 상태       | TanStack Query        | 캐싱, 동기화, 로딩/에러 상태 |
| 클라이언트 상태 | Zustand               | UI 상태, 전역 앱 상태        |
| 폼 상태         | React Hook Form + Zod | 입력값, 유효성 검사          |

---

## 1. axios — API 레이어

### 규칙

- **모든 API 호출은 `src/api/{domain}.ts`에 함수로 분리한다**
- **컴포넌트 또는 훅에서 axios를 직접 import하거나 호출하는 것은 금지한다**
- axios 인스턴스는 `src/lib/axios.ts`의 중앙화된 인스턴스만 사용한다
- API 함수는 순수하게 요청/응답만 담당한다 (부수효과 없음)
- 요청/응답 타입은 명시적으로 제네릭으로 선언한다

### 파일 구조

```text
src/
  lib/
    axios.ts          # 인스턴스, 인터셉터 설정
  api/
    auth.ts           # 인증 관련 API
    posts.ts          # 게시글 관련 API
    users.ts          # 유저 관련 API
```

### axios 인스턴스 (`src/lib/axios.ts`)

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
    // 공통 에러 처리 (401 리프레시 등)
    return Promise.reject(error);
  },
);
```

### API 함수 예시 (`src/api/posts.ts`)

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

### 금지 패턴

```ts
// ❌ 컴포넌트에서 직접 호출
import axios from "axios";
const res = await axios.get("/posts");

// ❌ 훅에서 직접 호출
import { apiClient } from "@/lib/axios";
const res = await apiClient.get("/posts"); // 훅에서 직접 사용 금지

// ✅ API 레이어 함수를 통해서만 호출
import { getPosts } from "@/api/posts";
```

---

## 2. TanStack Query — 서버 상태

### 규칙

- **서버 데이터의 캐싱, 로딩/에러 상태는 반드시 TanStack Query로 관리한다**
- 커스텀 훅으로 래핑한다: `src/features/{feature}/hooks/use{Domain}{Action}.ts`
- `queryKey`는 해당 도메인 파일에 상수로 중앙화한다
- `queryFn`에서 API 레이어 함수만 호출한다 (axios 직접 사용 금지)
- `useMutation` 성공 후 관련 쿼리를 반드시 `invalidateQueries`로 무효화한다
- 단순 조회는 컴포넌트에서 `useQuery`를 직접 사용할 수 있다. 공통 로직(파라미터 가공, staleTime 설정 등)이 있으면 커스텀 훅으로 분리한다
- `useMutation`은 항상 커스텀 훅으로 분리한다

### queryKey 규칙

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

### useQuery 훅 예시 (`src/features/post/hooks/usePostList.ts`)

```ts
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";
import { postQueryKeys } from "../queries/postQueryKeys";

export const usePostList = () => {
  return useQuery({
    queryKey: postQueryKeys.lists(),
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
```

### useMutation 훅 예시 (`src/features/post/hooks/useCreatePost.ts`)

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

### 컴포넌트 사용 예시

```tsx
// ✅ 단순 조회 — 컴포넌트에서 직접 사용 가능
const { data: posts, isLoading } = useQuery({
  queryKey: postQueryKeys.lists(),
  queryFn: getPosts,
});

// ✅ 공통 로직(staleTime, select, enabled 등)이 있으면 커스텀 훅으로 분리
const { data: posts, isLoading } = usePostList();

// ✅ mutation은 항상 커스텀 훅으로 분리
const { mutate: createPost, isPending } = useCreatePost();

// ❌ queryKey를 문자열로 직접 작성 금지 (반드시 queryKeys 상수 사용)
const { data } = useQuery({ queryKey: ["posts"], queryFn: getPosts });
```

### invalidateQueries 전략

mutation 성공 후 어떤 쿼리를 무효화할지는 영향 범위에 따라 결정한다.

| 상황                      | 전략                                  |
| ------------------------- | ------------------------------------- |
| 목록에 영향 (생성/삭제)   | `lists()` 키 무효화                   |
| 특정 항목에만 영향 (수정) | `detail(id)` 키 무효화                |
| 목록 + 상세 모두 영향     | `all` 키 무효화 (상위 키로 일괄 처리) |

```ts
// 생성 → 목록 무효화
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
},

// 수정 → 해당 상세만 무효화
onSuccess: (_, variables) => {
  queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(variables.id) });
},

// 삭제 → 목록 + 상세 일괄 무효화
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
},
```

### onSuccess 후처리

mutation 성공 후 라우팅, 토스트, 모달 닫기 등의 **UI 후처리는 `onSuccess`에서 수행한다.**
단, 훅 내부의 `onSuccess`와 컴포넌트에서 `mutate`에 전달하는 `onSuccess`를 역할에 따라 구분한다.

| 위치                                  | 담당 후처리                                           |
| ------------------------------------- | ----------------------------------------------------- |
| 훅 내부 `onSuccess`                   | 캐시 무효화, 전역 상태 업데이트 등 데이터 계층 후처리 |
| 컴포넌트 `mutate(..., { onSuccess })` | 토스트 알림, 모달 닫기, 페이지 이동 등 UI 후처리      |

```ts
// ✅ 훅: 데이터 후처리
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });
    },
  });
};

// ✅ 컴포넌트: UI 후처리
const { mutate: createPost } = useCreatePost();

const onSubmit = (values: CreatePostFormValues) => {
  createPost(values, {
    onSuccess: () => {
      toast.success("게시글이 등록되었습니다.");
      navigate("/posts");
    },
    onError: (error) => {
      toast.error("등록에 실패했습니다.");
    },
  });
};
```

---

## 3. Zustand — 클라이언트 상태

### TanStack Query와의 역할 분리

| 상태 종류                                     | 올바른 도구                 |
| --------------------------------------------- | --------------------------- |
| 서버에서 가져온 데이터                        | TanStack Query              |
| 서버 데이터의 로딩/에러                       | TanStack Query              |
| UI 상태 (모달 열림, 탭 선택 등)               | Zustand                     |
| 전역 앱 상태 (인증, 테마 등)                  | Zustand                     |
| 여러 컴포넌트가 공유하는 클라이언트 전용 상태 | Zustand                     |
| 서버 데이터를 로컬에서 캐시하거나 동기화      | ❌ Zustand 금지, Query 사용 |

### 규칙

- **서버 상태를 Zustand에 저장하지 않는다** (Query가 이미 캐시 관리)
- **TanStack Query의 데이터를 Zustand로 복사하지 않는다** — `useEffect`로 `data`를 스토어에 `set`하는 패턴은 금지
- `set`으로 직접 상태를 변경하고, 필요 시 `immer` 미들웨어를 사용한다
- 스토어는 `src/stores/{domain}Store.ts`에 위치한다
- 스토어는 도메인 단위로 분리한다 (하나의 거대한 전역 스토어 금지)
- 인증 토큰 등 민감 정보는 스토어에 저장하지 않는다

### 스토어 예시 (`src/stores/uiStore.ts`)

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

### 인증 스토어 예시 (`src/stores/authStore.ts`)

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

### 금지 패턴

```ts
// ❌ 서버 데이터를 Zustand에 저장
const usePostStore = create(() => ({
  posts: [], // 금지: 서버 데이터는 Query가 관리
  fetchPosts: async () => {
    /* axios 호출 */
  }, // 금지
}));

// ❌ Query 데이터를 Zustand로 복사 (동기화 문제 발생)
const { data } = usePostList();
useEffect(() => {
  if (data) usePostStore.getState().setPosts(data); // 금지
}, [data]);

// ✅ 서버 데이터는 Query, UI 상태만 Zustand
const { data: posts } = usePostList(); // Query
const { isModalOpen } = useUiStore(); // Zustand
```

---

## 4. React Hook Form + Zod — 폼 상태

### 규칙

- **모든 폼 상태는 React Hook Form으로 관리한다** (`useState` 기반 폼 금지)
- **유효성 검사는 반드시 Zod 스키마로 정의한다** (인라인 validate 함수 금지)
- 스키마는 `src/features/{feature}/schemas/{formName}.schema.ts`에 위치한다
- API 요청 타입과 폼 스키마를 최대한 공유한다 (`z.infer<typeof schema>`)
- `useMutation`과 `handleSubmit`을 연결할 때 `onSubmit`에서 mutate를 호출한다
- 에러 메시지는 스키마에서 정의한다 (컴포넌트에 하드코딩 금지)

### 파일 구조

```text
src/features/post/
  schemas/
    createPost.schema.ts
  hooks/
    useCreatePost.ts     # useMutation 훅
  components/
    CreatePostForm.tsx
```

### Zod 스키마 정의 (`src/features/post/schemas/createPost.schema.ts`)

```ts
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요.").max(100, "제목은 100자 이하로 입력해주세요."),
  content: z
    .string()
    .min(10, "내용을 10자 이상 입력해주세요.")
    .max(5000, "내용은 5000자 이하로 입력해주세요."),
  category: z.enum(["FREE", "QUESTION", "NOTICE"], {
    required_error: "카테고리를 선택해주세요.",
  }),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
```

### 폼 컴포넌트 (`src/features/post/components/CreatePostForm.tsx`)

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
      <input {...register("title")} placeholder="제목" />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea {...register("content")} placeholder="내용" />
      {errors.content && <p>{errors.content.message}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "등록 중..." : "등록"}
      </button>
    </form>
  );
};
```

### API 타입과 스키마 공유

```ts
// 스키마에서 타입을 파생시켜 API 요청 타입으로 재사용
import type { CreatePostFormValues } from "../schemas/createPost.schema";

// API 함수 시그니처
export const createPost = async (body: CreatePostFormValues): Promise<Post> => {
  const { data } = await apiClient.post<Post>("/posts", body);
  return data;
};
```

### 금지 패턴

```tsx
// ❌ useState로 폼 상태 관리
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

// ❌ 인라인 유효성 검사
<input
  {...register("title", {
    required: "제목을 입력해주세요.", // 금지: 스키마로 정의해야 함
    maxLength: { value: 100, message: "..." },
  })}
/>;

// ❌ 스키마 없이 직접 validate 함수 작성
resolver: async (values) => {
  /* 직접 검사 로직 */
};
```

---

## 5. 에러 처리 규칙

에러 처리는 계층별로 책임을 분리한다.

| 계층           | 처리 대상                          | 방법                          |
| -------------- | ---------------------------------- | ----------------------------- |
| axios 인터셉터 | 공통 HTTP 에러 (401, 403, 500 등)  | `interceptors.response`       |
| TanStack Query | 쿼리/뮤테이션 단위 에러 상태       | `isError`, `error`, `onError` |
| 컴포넌트       | UI 에러 표시 (토스트, 에러 메시지) | `mutate(..., { onError })`    |

### axios 인터셉터 — 공통 에러 처리

```ts
apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 토큰 만료 → 리프레시 또는 로그아웃
    }
    if (error.response?.status === 403) {
      // 권한 없음 처리
    }
    return Promise.reject(error);
  },
);
```

### useQuery 에러 처리

```tsx
const { data, isError, error } = useQuery({
  queryKey: postQueryKeys.lists(),
  queryFn: getPosts,
});

if (isError) return <ErrorMessage message={error.message} />;
```

### useMutation 에러 처리

```ts
// 훅: 공통 에러 처리
export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onError: (error: AxiosError) => {
      // 공통 처리가 필요한 경우에만 훅에서 처리
      console.error("게시글 생성 실패:", error);
    },
  });
};

// 컴포넌트: UI 에러 처리
createPost(values, {
  onError: () => toast.error("등록에 실패했습니다."),
});
```

### 규칙

- **axios 인터셉터에서는 공통 HTTP 에러만 처리한다** (모든 에러를 삼키지 않는다)
- **`try/catch`로 Query 에러를 직접 잡지 않는다** — `isError` / `onError` 사용
- 에러 바운더리(`ErrorBoundary`)는 페이지 단위로 적용한다
- API 에러 응답의 타입을 `AxiosError<ErrorResponse>`로 명시한다

---

## 전체 데이터 흐름 요약

```text
컴포넌트
  └─ useForm (React Hook Form)      ← 폼 입력값, 유효성
  └─ useUiStore (Zustand)           ← UI 상태
  └─ usePostList (TanStack Query)   ← 서버 데이터 읽기
       └─ getPosts (axios API fn)   ← HTTP 요청
  └─ useCreatePost (TanStack Query) ← 서버 데이터 쓰기
       └─ createPost (axios API fn) ← HTTP 요청
```
