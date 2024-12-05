import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import { SignupParams } from "../../services/authService/signup";
import { toast } from 'react-hot-toast';
import { sleep } from "../../utils/sleep";
import { useAuth } from "../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().min(1, 'Senha é obrigatória').min(8, 'Senha deve conter no mínimo 8 dígitos')
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { signin } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      await sleep(1500);

      return authService.signup(data);
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken)

      toast.success('A conta foi criada com sucesso!')
    } catch {
      toast.error('Ocorreu um erro ao criar a sua conta.');
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isPending
  };
}
