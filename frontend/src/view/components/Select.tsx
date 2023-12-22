import * as RdxSelect from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import cn from "../../utils/cn";
import { useState } from "react";

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
}

export function Select({ className, placeholder, error }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState('');

  function handleSelect(value: string) {
    setSelectedValue(value);
  }

  return (
    <div>
      <div className="relative">
        <label className={cn(
          'absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none',
          selectedValue && 'text-xs left-[13px] top-2 translate-y-0 transition-all'
        )}>
          {placeholder}
        </label>
        <RdxSelect.Root onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              'bg-white w-full px-3 border border-gray-500 rounded-lg h-[52px] focus:border-gray-800 transition-all outline-none text-left relative pt-4',
              error && '!border-red-900',
              className,
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton
                className="flex items-center justify-center h-[25px] bg-white cursor-default text-gray-800"
              >
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>
              <RdxSelect.Viewport className="p-2">
                <RdxSelect.Item
                  value="Banana"
                  className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors"
                >
                  <RdxSelect.ItemText>Banana</RdxSelect.ItemText>
                </RdxSelect.Item>
                <RdxSelect.Item
                  value="Uva"
                  className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors"
                >
                  <RdxSelect.ItemText>Uva</RdxSelect.ItemText>
                </RdxSelect.Item>
                <RdxSelect.Item
                  value="Maçã"
                  className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors"
                >
                  <RdxSelect.ItemText>Maçã</RdxSelect.ItemText>
                </RdxSelect.Item>
              </RdxSelect.Viewport>
              <RdxSelect.ScrollDownButton
                className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
              >
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-900 mt-2">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
