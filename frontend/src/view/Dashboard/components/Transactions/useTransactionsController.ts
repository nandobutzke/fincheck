import { useEffect, useState } from "react";
import { useDashboard } from "../DasboardContext/useDashboard";
import { useTransactions } from "../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../services/transactionsService/getAll";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } = useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  function handleApplyFilters({
    bankAccountId, year
   }: { bankAccountId: string | undefined; year: number }) {
     handleChangeFilters('year')(year);
     handleChangeFilters('bankAccountId')(bankAccountId);
     setIsFiltersModalOpen(false);
 }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading,
    handleChangeFilters,
    handleApplyFilters,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    refetchTransactions
  };
}
