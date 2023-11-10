import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({data});
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}
