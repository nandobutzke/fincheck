import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from './DropdownMenu';

export function UserMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">FB</span>
        </div>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-32">
          <DropdownMenu.Item className="flex items-center justify-between">
            Sair
            <ExitIcon className="w-6" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
