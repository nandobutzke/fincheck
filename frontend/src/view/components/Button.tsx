import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<"button"> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 h-12 rounded-2xl font-medium text-white transition-all"
    >

    </button>
  );
}
