import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../services/transactionsService";
import { currencyStringToNumber } from "../../../../utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { TransactionType } from "../../../../enums/TransactionType";

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Informe o valor'),
    z.number()
  ]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe o tipo de valor'),
  date: z.date()
});

type FormData = z.infer<typeof schema>

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    }
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();
  const {
    isPending,
    mutateAsync: updateTransaction
  } = useMutation({
    mutationFn: transactionsService.update
  });

  const {
    isPending: isPendingDelete,
    mutateAsync: removeTransaction
  } = useMutation({
    mutationFn: transactionsService.remove
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async data => {
    try {
      if (!transaction) return;

      await updateTransaction({
        ...data,
        id: transaction.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString()
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions-extract'] });
      toast.success(
        transaction!.type === TransactionType.EXPENSE
        ? 'Despesa editada com sucesso!'
        : 'Receita editada com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === TransactionType.EXPENSE
        ? 'Erro ao salvar a despesa!'
        : 'Erro ao salvar a receita!'
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions-extract'] });
      toast.success(`A ${transaction!.type === TransactionType.EXPENSE ? 'despesa' : 'receita'} foi deletada com sucesso!`);
      onClose();
    } catch {
      toast.error(`Erro ao deletar a ${transaction!.type === TransactionType.EXPENSE ? 'despesa' : 'receita'}!`);
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
    isDeleteModalOpen,
    isPendingDelete,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal
  };
}
