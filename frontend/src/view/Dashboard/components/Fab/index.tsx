
import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../components/DropdownMenu";

export function Fab() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="fixed right-4 bottom-4 bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white">
          <PlusIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>
          Nova Despesa
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Nova Receita
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Nova Conta
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
