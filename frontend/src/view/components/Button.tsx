import { ComponentProps } from 'react';
import cn from "../../utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isPending?: boolean;
}

export function Button({ className, children, disabled, isPending, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center',
        className,
      )}
      disabled={disabled || isPending}
    >
      {!isPending && children}
      {isPending && <Spinner className="w-7 h-7"/>}
    </button>
  );
}
