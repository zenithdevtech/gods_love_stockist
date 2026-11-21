import React from "react";
import type { HowItWorksCardProps } from "../../lib/interfaces";

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  name,
  id,
  detail,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-md bg-white border border-secondary-dark/80 shadow-xs transition hover:border-primary/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-soft text-primary text-xl mb-4">
        {icon || <span className="font-bold">{id}</span>}
      </div>

      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-faint mb-1">
        Step 0{id}
      </span>

      <h3 className="font-display text-base font-bold text-neutral-dark">
        {name}
      </h3>
      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-soft">
        {detail}
      </p>
    </div>
  );
};

export default HowItWorksCard;
