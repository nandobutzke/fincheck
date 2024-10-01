import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../components/icons/TransactionsIcon";
import { DropdownMenu } from "../../../components/DropdownMenu";
import { IncomeIcon } from "../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../components/icons/ExpensesIcon";
import { TransactionType } from "../../../../enums/TransactionType";

interface TransactionTypeDropdownProps {
  onSelect(type: TransactionType.INCOME | TransactionType.EXPENSE | undefined): void;
  selectedType: TransactionType.INCOME | TransactionType.EXPENSE | undefined;
}

export function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectedType === TransactionType.INCOME && <IncomeIcon />}
          {selectedType === TransactionType.EXPENSE && <ExpensesIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-gray-800 text-sm tracking-[-0.5px] font-medium">
            {selectedType === TransactionType.INCOME && 'Receitas'}
            {selectedType === TransactionType.EXPENSE && 'Despesas'}
            {selectedType === undefined && 'Transações'}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect(TransactionType.INCOME)}>
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect(TransactionType.EXPENSE)}>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
