import { z } from "zod";
import { useDashboard } from "../../components/DasboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../services/bankAccountsService";
import { currencyStringToNumber } from "../../../../utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório.'),
  name: z.string().min(1, 'Nome da conta é obrigatório.'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória.')
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
   } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.create
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta foi cadastrada com sucesso!');
      closeNewAccountModal();
      reset();
    } catch {
      toast.error('Erro ao cadastrar a conta!');
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending
  };
}
