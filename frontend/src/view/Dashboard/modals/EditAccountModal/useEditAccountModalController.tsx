import { z } from "zod";
import { useDashboard } from "../../components/DasboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../services/bankAccountsService";
import { currencyStringToNumber } from "../../../../utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  balance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório.'),
    z.number()
  ]),
  name: z.string().min(1, 'Nome da conta é obrigatório.'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória.')
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited
   } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
      balance: accountBeingEdited?.balance
    }
  });

  const [isExtractFiltersModalOpen, setIsExtractFiltersModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    isPending,
    mutateAsync: updateAccount
  } = useMutation({
    mutationFn: bankAccountsService.update
  });

  const {
    isPending: isPendingDelete,
    mutateAsync: removeAccount
  } = useMutation({
    mutationFn: bankAccountsService.remove
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        balance: currencyStringToNumber(data.balance),
        id: accountBeingEdited!.id
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('A conta foi salva com sucesso!');
      closeEditAccountModal();
      reset();
    } catch {
      toast.error('Erro ao salvar as alterações!');
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleOpenExtractFiltersModal() {
    console.log('is open')
    setIsExtractFiltersModalOpen(true);
  }

  function handleCloseExtractFiltersModal() {
    setIsExtractFiltersModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions-extract'] });
      toast.success('A conta foi deletada com sucesso!');
      closeEditAccountModal();
      reset();
    } catch {
      toast.error('Erro ao deletar a conta!');
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isExtractFiltersModalOpen,
    handleOpenExtractFiltersModal,
    handleCloseExtractFiltersModal,
    handleDeleteAccount,
    isPendingDelete,
  };
}
