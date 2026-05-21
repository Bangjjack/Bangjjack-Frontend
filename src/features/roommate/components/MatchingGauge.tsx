function MatchingGauge({ percentage }: { percentage: number }) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const r = 66;
  const strokeWidth = 12;
  const cx = 90;
  const cy = 90;
  const circumference = Math.PI * r;
  const progress = (clamped / 100) * circumference;

  return (
    <div className="relative h-[100px] w-[180px]">
      <svg viewBox="0 0 180 100" width="180" height="100" aria-hidden="true">
        {/* Background track */}
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
          fill="none"
          stroke="var(--color-neutral-200)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
          fill="none"
          stroke="var(--color-brand-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-end justify-center pb-[6px]">
        <span className="typo-h1 text-text-primary-normal">{clamped}</span>
        <span className="typo-h3 mb-[2px] text-text-primary-normal">%</span>
      </div>
    </div>
  );
}

export { MatchingGauge };
