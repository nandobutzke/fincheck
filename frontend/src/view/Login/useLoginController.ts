import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { httpClient } from "../../services/HttpClient";

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().min(1, 'Senha é obrigatória').min(8, 'Senha deve conter pelo menos 8 dígitos')
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
   } = useForm<FormData>({
    resolver: zodResolver(schema),
   });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await httpClient.post('/auth/signin', data);
  });

   return {
    register,
    handleSubmit,
    errors
   }
}
