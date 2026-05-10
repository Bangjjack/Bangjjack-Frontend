# API Layer (axios)

- 모든 API 호출은 src/api/{domain}.ts에 함수로 분리
- apiClient만 사용 (직접 axios import 금지)
- 컴포넌트 / 훅에서 axios 호출 금지
- API 함수는 요청/응답만 담당 (side effect 금지)
- 타입은 명시적으로 선언

## Pattern

```ts
export const getPosts = async (): Promise<Post[]> => {
  const { data } = await apiClient.get<Post[]>("/posts");
  return data;
};
```

---

# TanStack Query → [src/features/AGENTS.md](../features/AGENTS.md)
