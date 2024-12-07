import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from 'react-number-format';
import cn from "../../utils/cn";

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
        allowNegative={false}
        allowLeadingZeros={false}
        prefix=""
        value={value}
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          error && 'text-red-900'
        )}
        onChange={(event) => onChange?.(event.target.value)}
      />

      {error && (
        <div className="flex items-center gap-2 text-red-900 mt-2">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
