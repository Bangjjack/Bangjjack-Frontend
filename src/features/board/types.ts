/** 태그 항목 (선택 여부 포함) */
type TagItem = {
  label: string;
  selected: boolean;
};

/** 기본 태그 카테고리 (학기, 기숙사, 중요하게 생각하는 점 등) */
type BasicTagCategory = {
  title: string;
  tags: TagItem[];
};

/** 생활습관 카테고리 (선택지 목록) */
type HabitCategory = {
  label: string;
  options: readonly string[];
};

/** 생활습관 (읽기 전용, 선택된 인덱스 포함) */
type Habit = HabitCategory & {
  selectedIndex: number;
};

/** 방 크기 */
type RoomSize = "TWO_PERSON" | "THREE_PERSON" | "FOUR_PERSON";

/** 모집글 상태 */
type PostStatus = "OPEN" | "CLOSED";

/** 학기 */
type Semester = "SIXTEEN_WEEKS";

/** 기숙사 */
type Dormitory = "DORM_1";

/** 분리수거 */
type Recycling = "SHARE_BIN" | "MANAGE_SEPARATELY";

/** 전화 통화 */
type PhoneCall = "ONLY_IN_ROOM" | "SHORT_CALLS_OKAY" | "NO_PREFERENCE";

/** 물건 공유 */
type ItemSharing = "USE_SEPARATELY" | "BORROW_WITH_PERMISSION" | "NO_PREFERENCE";

/** 소등 시간 */
type LightsOutTime =
  | "BEFORE_23"
  | "BETWEEN_23_24"
  | "BETWEEN_00_01"
  | "BETWEEN_01_02"
  | "AFTER_03"
  | "NO_PREFERENCE";

/** 공동 생활습관 */
type SharedLifestyle = {
  roomTrashBinSharing: boolean;
  recycling: Recycling;
  phoneCall: PhoneCall;
  itemSharing: ItemSharing;
  earphoneUsage: boolean;
  lightsOutTime: LightsOutTime;
};

/** 작성자 정보 */
type PostAuthor = {
  authorId: number;
  username: string;
  profileImage: string;
};

/** 게시글 상세 응답 data */
type PostDetail = {
  postId: number;
  title: string;
  description: string;
  roomSize: RoomSize;
  recruitMemberCount: number;
  status: PostStatus;
  semester: Semester;
  dormitory: Dormitory;
  isOwner: boolean;
  createdAt: string;
  author: PostAuthor;
  sharedLifestyle: SharedLifestyle;
};

/** API 공통 응답 래퍼 */
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type {
  TagItem,
  BasicTagCategory,
  HabitCategory,
  Habit,
  RoomSize,
  PostStatus,
  Semester,
  Dormitory,
  Recycling,
  PhoneCall,
  ItemSharing,
  LightsOutTime,
  SharedLifestyle,
  PostAuthor,
  PostDetail,
  ApiResponse,
};
