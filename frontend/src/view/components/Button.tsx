import { ComponentProps } from 'react';
import cn from "../../utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isPending?: boolean;
  variant?: 'danger' | 'ghost';
}

export function Button({ className, children, disabled, isPending, variant, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center',
        variant === 'danger' && 'bg-red-900 hover:bg-red-800',
        variant === 'ghost' && 'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-950/5',
        className,
      )}
      disabled={disabled || isPending}
    >
      {!isPending && children}
      {isPending && <Spinner className="w-7 h-7"/>}
    </button>
  );
}
