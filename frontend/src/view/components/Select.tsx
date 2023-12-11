import React from 'react';
import * as RdxSelect from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import cn from "../../utils/cn";



export function Select() {
  return (
    <RdxSelect.Root>
      <RdxSelect.Trigger
        className={cn(
          'bg-white w-full px-3 border border-gray-500 rounded-lg h-[52px] focus:border-gray-800 transition-all outline-none text-left relative',
          // error && '!border-red-900',
          //className,
        )}
      >
        <RdxSelect.Value />
        <RdxSelect.Icon className="absolute right-3 bottom-3">
          <ChevronDownIcon className="w-6 h-6 text-gray-800" />
        </RdxSelect.Icon>
      </RdxSelect.Trigger>
      <RdxSelect.Portal>
        <RdxSelect.Content className="z-[99] overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronUpIcon />
          </RdxSelect.ScrollUpButton>
          <RdxSelect.Viewport className="p-[5px]">
            <RdxSelect.Group>
              <RdxSelect.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Fruits
              </RdxSelect.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </RdxSelect.Group>

            <RdxSelect.Separator className="h-[1px] bg-violet6 m-[5px]" />

            <RdxSelect.Group>
              <RdxSelect.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Vegetables
              </RdxSelect.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </RdxSelect.Group>

            <RdxSelect.Separator className="h-[1px] bg-violet6 m-[5px]" />

            <RdxSelect.Group>
              <RdxSelect.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Meat
              </RdxSelect.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </RdxSelect.Group>
          </RdxSelect.Viewport>
          <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </RdxSelect.ScrollDownButton>
        </RdxSelect.Content>
      </RdxSelect.Portal>
    </RdxSelect.Root>
  );
}

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <RdxSelect.Item
      className={cn(
        'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <RdxSelect.ItemText>{children}</RdxSelect.ItemText>
      <RdxSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
     </RdxSelect.ItemIndicator>
    </RdxSelect.Item>
  );
});
