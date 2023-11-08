import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Register() {
  return (
    <>
      <header className="flex items-center flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Já possuí uma conta?</span>
          <Link to="/login" className="text-teal-900 font-medium tracking-[-0.5px]">Fazer Login</Link>
        </p>
      </header>
      <form className="mt-[60px] flex flex-col gap-4">
        <Input type="text" name="name" placeholder="Nome" />
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password"name="password" placeholder="Senha" />

        <Button type="submit" className="mt-2">
          Criar conta
        </Button>
      </form>
    </>
  )
}
