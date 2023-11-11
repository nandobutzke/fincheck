import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import { SigninParams } from "../../services/authService/signin";
import { toast } from 'react-hot-toast';
import { sleep } from "../../utils/sleep";

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().min(1, 'Senha é obrigatória').min(8, 'Senha deve conter no mínimo 8 dígitos')
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      await sleep(1500);

      return authService.signin(data);
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch {
      toast.error('Credenciais Inválidas.');
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isPending
  };
}
