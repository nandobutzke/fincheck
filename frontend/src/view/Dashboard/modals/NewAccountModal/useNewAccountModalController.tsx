import { useDashboard } from "../../components/DasboardContext/useDashboard";

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
   } = useDashboard();

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
