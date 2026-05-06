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

---

# TanStack Query → `/src/features/AGENTS.md`

```md
# Server State (TanStack Query)

- 서버 데이터는 Query로 관리
- queryFn에서는 API 함수만 호출
- mutation은 항상 커스텀 훅으로 분리
- queryKey는 상수로 관리 (문자열 직접 사용 금지)

## Invalidate Rules

- 생성/삭제 → lists()
- 수정 → detail(id)
- 전체 영향 → all

## Error Handling

- try/catch 사용 금지
- isError / onError 사용