import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../../services/transactionsService";
import { TransactionsFilters } from "../../@types/TransactionsFilters";

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isPending, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters)
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading: isPending,
    refetchTransactions: refetch
  }
}
