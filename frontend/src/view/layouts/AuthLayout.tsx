import { Outlet } from "react-router-dom";
import illustration from '../../assets/illustration.png';
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="w-full h-full flex items-center justify-center flex-col gap-16 lg:w-1/2">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full justify-center items-center p-8 relative hidden lg:flex">
        <img src={illustration} alt="Imagem de ilustração da interface do app" className="object-cover max-w-[656px] max-h-[960px] h-full w-full select-none rounded-[32px]" />

        <div className="max-w-[656px] absolute mx-8 bottom-8 bg-white rounded-b-[32px] py-10 px-[84px]">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6 ">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
