import { ReaderIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { ThreeDotsIcon } from "../../../../components/icons/ThreeDotsIcon";
import { TrashIcon } from "../../../../components/icons/TrashIcon";

interface OptionsMenuProps {
  onOpenDeleteModal(): void
  onOpenExtractFiltersModal(): void
}

export function OptionsMenu({ onOpenDeleteModal, onOpenExtractFiltersModal }: OptionsMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="w-8 h-8 hover:bg-gray-100 ease-in duration-200 rounded-full flex items-center justify-center text-white">
          <ThreeDotsIcon className="w-4 h-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item className="gap-2 flex items-center justify-center" onSelect={onOpenExtractFiltersModal}>
          <div className="w-[42px] h-[42px] bg-gray-50 rounded-full flex items-center justify-center">
            <ReaderIcon className="w-6 h-6" />
          </div>
          Gerar extrato
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2" onSelect={() => onOpenDeleteModal()}>
          <div className="w-[42px] h-[42px] rounded-full bg-red-50 flex items-center justify-center">
            <TrashIcon className="w-6 h-6 text-red-900" />
          </div>
          Excluir conta
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
