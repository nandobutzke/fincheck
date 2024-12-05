import { z } from "zod";
import { useDashboard } from "../../components/DasboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { transactionsService } from "../../../../services/transactionsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../utils/currencyStringToNumber";
import { TransactionType } from "../../../../enums/TransactionType";

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe o tipo de valor'),
  date: z.date()
});

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
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
      date: new Date()
    }
  });

  const { accounts } = useBankAccounts();
  const queryClient = useQueryClient();
  const { categories: categoriesList } = useCategories();
  const {
    isPending,
    mutateAsync
  } = useMutation({
    mutationFn: transactionsService.create
  });

  const handleSubmit = hookFormSubmit(async data => {
    try {
      console.log(data.date.toISOString())

      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString()
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        newTransactionType === TransactionType.EXPENSE
        ? 'Despesa cadastrada com sucesso!'
        : 'Receita cadastrada com sucesso!'
      );
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === TransactionType.EXPENSE
        ? 'Erro ao cadastrar a despesa!'
        : 'Erro ao cadastrar a receita!'
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType)
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending
  };
}
