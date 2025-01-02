import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, label, type, ...props }, ref) => {
    return (
      <div className="inputbox relative w-full">
        <input
          type={type}
          className={cn(
            "w-full bg-transparent p-5 pb-2.5 text-foreground outline-none transition-all",
            "border-none text-base shadow-none",
            className
          )}
          ref={ref}
          required
          {...props}
        />
        <span className="pointer-events-none absolute left-0 p-5 pb-2.5 text-base text-muted-foreground transition-all">
          {label}
        </span>
        <i className="absolute bottom-0 left-0 z-[9] h-0.5 w-full rounded-sm bg-primary transition-all" />
      </div>
    );
  }
);
CustomInput.displayName = "CustomInput";

export { CustomInput }; 