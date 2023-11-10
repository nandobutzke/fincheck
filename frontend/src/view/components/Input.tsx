import { ComponentProps, forwardRef } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import cn from "../../utils/cn";

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, name, error, id, ...rest }, ref) => {
    const inputId = name ?? id;

    return (
      <div className="relative">
        <input
          {...rest}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            'bg-white pt-4 w-full px-3 border border-gray-500 rounded-lg h-[52px] peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
            error && '!border-red-900',
            className,
          )}
          placeholder=" "
        />

        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex items-center gap-2 text-red-900 mt-2">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
)
