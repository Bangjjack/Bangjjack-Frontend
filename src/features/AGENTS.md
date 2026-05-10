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
