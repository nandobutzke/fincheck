import { useDashboard } from "../DasboardContext/useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return { areValuesVisible, isLoading: true };
}
