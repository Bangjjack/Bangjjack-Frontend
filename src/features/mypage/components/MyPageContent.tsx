import { MyPageActionCard } from "@/features/mypage/components/MyPageActionCard";
import { MyPageMenuSection } from "@/features/mypage/components/MyPageMenuSection";
import { MyPageProfileCard } from "@/features/mypage/components/MyPageProfileCard";
import { cn } from "@/lib/cn";

export interface MyPageContentProps {
  className?: string;
}

const PROFILE = {
  age: 20,
  department: "컴퓨터공학과",
  name: "김지수",
};

function MyPageContent({ className }: MyPageContentProps) {
  return (
    <div className={cn("flex flex-col gap-400 pt-400", className)}>
      <MyPageProfileCard
        age={PROFILE.age}
        department={PROFILE.department}
        name={PROFILE.name}
      />
      <MyPageActionCard />
      <MyPageMenuSection />
    </div>
  );
}

export { MyPageContent };
