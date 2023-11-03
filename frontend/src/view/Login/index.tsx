import { Link } from "react-router-dom";
import Input from "../components/Input";

export function Login() {
  return (
    <div>
      <header className="flex items-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>
          <Link to="/register" className="text-teal-900 font-medium tracking-[-0.5px]">Crie uma conta</Link>
        </p>
      </header>
      <form className="mt-[60px] flex flex-col gap-4">
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password"name="password" placeholder="Senha" />

        <button type="submit" className="mt-2">
          Entrar
        </button>
      </form>
    </div>
  );
}
