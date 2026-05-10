# Client State (Zustand)

- 서버 데이터 저장 금지
- Query 데이터를 store로 복사 금지
- UI 상태 / 전역 상태만 관리

## Anti-pattern

❌ Query → Zustand 복사
❌ fetch 로직 포함

## Correct

- UI 상태만 저장