import { ComponentProps } from 'react';
import cn from "../../utils/cn";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 h-12 rounded-2xl font-medium text-white transition-all',
        className,
      )}
    >
    </button>
  );
}
