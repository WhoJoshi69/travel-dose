import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="inputbox h-[45px]">
        <input
          type={type}
          className={cn(
            "peer h-[45px] w-full",
            "border-none bg-background outline-none ring-0 focus:ring-0",
            className
          )}
          placeholder=" "
          ref={ref}
          {...props}
        />
        <span className="truncate">{label}</span>
        <i />
      </div>
    );
  }
);
AnimatedInput.displayName = "AnimatedInput";

export { AnimatedInput }; 