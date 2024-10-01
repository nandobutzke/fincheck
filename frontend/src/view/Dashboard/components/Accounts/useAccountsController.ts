import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DasboardContext/useDashboard";
import { useBankAccounts } from "../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal,
  } = useDashboard()

  const [sliderState, setSliderState] = useState({
    isBeginning: false,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, bankAccount) => total + bankAccount.currentBalance, 0)
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: accounts ?? [],
    openNewAccountModal,
    currentBalance,
  };
}
