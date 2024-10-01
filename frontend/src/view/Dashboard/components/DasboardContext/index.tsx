import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../app/entities/bankAccount";
import { TransactionType } from "../../../../enums/TransactionType";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: TransactionType.INCOME | TransactionType.EXPENSE | null;
  toggleValuesVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;
  openNewTransactionModal(type: TransactionType.INCOME | TransactionType.EXPENSE): void;
  closeNewTransactionModal(): void;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: BankAccount | null
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<TransactionType.INCOME | TransactionType.EXPENSE | null>(null);
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState)
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setIsEditAccountModalOpen(true);
    setAccountBeingEdited(bankAccount);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false);
    setAccountBeingEdited(null);
  }, []);

  const openNewTransactionModal = useCallback((type: TransactionType.INCOME | TransactionType.EXPENSE) => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        newTransactionType,
        isEditAccountModalOpen,
        accountBeingEdited,
        openEditAccountModal,
        closeEditAccountModal
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
