import { CrossCircledIcon } from "@radix-ui/react-icons";
import cn from "../../utils/cn";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({ error, value, onChange, className }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date)
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'bg-white w-full px-3 border border-gray-500 rounded-lg h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4',
              error && '!border-red-900',
              className,
            )}
          >
            <span className="absolute text-xs text-gray-700 left-[13px] top-2 pointer-events-none">Data</span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={handleChangeDate}
          />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-2 items center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
