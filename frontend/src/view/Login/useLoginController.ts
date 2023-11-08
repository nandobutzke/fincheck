import { useForm } from "react-hook-form";

type FormData = { email: string; password: string; };

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
   } = useForm<FormData>();

   const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({data});
   });

   return {
    handleSubmit,
    register
   }
}
