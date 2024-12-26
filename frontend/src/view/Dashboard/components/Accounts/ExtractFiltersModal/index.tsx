import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../components/Modal";
import { Button } from "../../../../components/Button";
import cn from "../../../../../utils/cn";
import { useExtractFiltersModalController } from "./useExtractFiltersModalController";
import { MONTHS } from "../../../../../app/config/constants";
import { TransactionTypeDropdown } from "../../Transactions/TransactionTypeDropdown";
import { TransactionType } from "../../../../../enums/TransactionType";
import { useDashboard } from "../../DasboardContext/useDashboard";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
    month: number;
    type: TransactionType | undefined;
  }): void;
}

export function ExtractFiltersModal({ open, onClose, onApplyFilters }: FiltersModalProps) {
  const {
    handleChangeYear,
    handleChangeMonth,
    handleChangeTransactionType,
    selectedYear,
    selectedMonth,
    selectedTransactionType
  } = useExtractFiltersModalController();

  const { accountBeingEdited } = useDashboard();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>
        <div className="space-y-2 mt-2">

          <button
            key={accountBeingEdited?.id}
            className={cn(
              'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors',
              accountBeingEdited?.id && '!bg-gray-200'
            )}
          >
            {accountBeingEdited?.name}
          </button>

        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Ano
        </span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            onClick={() => handleChangeYear(-1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">{selectedYear}</span>
          </div>
          <button
            onClick={() => handleChangeYear(1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Mês
        </span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            onClick={() => handleChangeMonth(-1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {MONTHS.find((_, index) => index === selectedMonth)}
            </span>
          </div>
          <button
            onClick={() => handleChangeMonth(1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Tipo da transação
        </span>
        <div className="space-y-2 mt-2">
          <div className="flex items-center justify-between">
            <TransactionTypeDropdown
              onSelect={handleChangeTransactionType}
              selectedType={selectedTransactionType}
            />
          </div>
        </div>
      </div>

      <Button
        className="mt-10 w-full"
        onClick={() => onApplyFilters({
          bankAccountId: accountBeingEdited?.id,
          year: selectedYear,
          month: selectedMonth,
          type: selectedTransactionType
        })}
      >
        Gerar extrato
      </Button>
    </Modal>
  );
}
