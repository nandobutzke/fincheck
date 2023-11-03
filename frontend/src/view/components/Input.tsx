import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  name: string;
}

export default function Input({ placeholder, name, id, ...rest }: InputProps) {
  const inputId = name ?? id;

  return (
    <div className="relative">
      <input
        {...rest}
        name={name}
        id={inputId}
        className="bg-white pt-4 w-full px-3 border border-gray-500 rounded-lg h-[52px] peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
}
