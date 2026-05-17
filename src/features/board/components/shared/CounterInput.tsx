import { MinusIcon, PlusIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";

type CounterInputProps = {
  value: number;
  min?: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

function CounterInput({ value, min = 1, max = 4, onIncrement, onDecrement }: CounterInputProps) {
  const isMin = value <= min;
  const isMax = value >= max;

  return (
    <div className="flex items-center gap-400">
      <button
        type="button"
        className={cn(
          "flex size-700 items-center justify-center rounded-small bg-bg-input",
          isMin ? "opacity-40" : "cursor-pointer",
        )}
        onClick={onDecrement}
        disabled={isMin}
        aria-label="인원 감소"
      >
        <MinusIcon className="size-400" />
      </button>
      <span className="typo-title1 w-6 text-center text-icon-primary-alternative">{value}</span>
      <button
        type="button"
        className={cn(
          "flex size-700 items-center justify-center rounded-small bg-brand-primary-light",
          isMax ? "opacity-40" : "cursor-pointer",
        )}
        onClick={onIncrement}
        disabled={isMax}
        aria-label="인원 증가"
      >
        <PlusIcon className="size-400" />
      </button>
    </div>
  );
}

export { CounterInput };
export type { CounterInputProps };
