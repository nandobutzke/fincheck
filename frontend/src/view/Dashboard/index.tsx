import { Logo } from "../components/Logo";
import { UserMenu } from "../components/UserMenu";

export function Dashboard() {
  return (
    <div className="w-full h-full px-8 pb-8 pt-6">
      <header className="flex justify-between items-center">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>

      <main>
        content
      </main>
    </div>
  );
}
