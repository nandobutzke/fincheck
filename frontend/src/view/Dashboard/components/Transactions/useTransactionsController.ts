import { useEffect, useState } from "react";
import { useDashboard } from "../DasboardContext/useDashboard";
import { useTransactions } from "../../../../app/hooks/useTransactions";
import { Transaction } from "../../../../app/entities/Transaction";
import { TransactionsFilters } from "../../../../@types/TransactionsFilters";
import { useExtract } from "../../../../app/hooks/useExtract";
import { TransactionType } from "../../../../enums/TransactionType";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(true);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<null | Transaction>(null)
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } = useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  const { generateExtract } = useExtract();

  async function handleGenerateExtract(filters: TransactionsFilters) {
    const extract = await generateExtract(filters)

    const blobUrl = URL.createObjectURL(extract.data);

    window.open(blobUrl);
  }

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
    bankAccountId, year, month, type
   }: {
    bankAccountId: string | undefined;
    year: number;
    month: number;
    type: TransactionType | undefined;
  }) {
    console.log({ bankAccountId, year, month, type })

    handleChangeFilters('year')(year);
    handleChangeFilters('month')(month);
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('type')(type);
    setIsFiltersModalOpen(false);
 }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null);
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
    refetchTransactions,
    handleGenerateExtract,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenEditModal,
    handleCloseEditModal
  };
}
