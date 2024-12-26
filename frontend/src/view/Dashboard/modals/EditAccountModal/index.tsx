import { Controller } from "react-hook-form";
import { Button } from "../../../components/Button";
import { ColorsDropdownInput } from "../../../components/ColorsDropdownInput";
import { Input } from "../../../components/Input";
import { InputCurrency } from "../../../components/InputCurrency";
import { Modal } from "../../../components/Modal";
import { Select } from "../../../components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal";
import { OptionsMenu } from "./OptionsMenu";
import { useTransactionsController } from "../../components/Transactions/useTransactionsController";
import { ExtractFiltersModal } from "../../components/Accounts/ExtractFiltersModal";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isPendingDelete,
    isExtractFiltersModalOpen,
    handleCloseExtractFiltersModal,
    handleOpenExtractFiltersModal,
  } = useEditAccountModalController();

  const { handleGenerateExtract } = useTransactionsController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onConfirm={handleDeleteAccount}
        onClose={handleCloseDeleteModal}
        isPending={isPendingDelete}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
      />
    );
  }

  if (isExtractFiltersModalOpen) {
    return (
      <ExtractFiltersModal
        open={isExtractFiltersModalOpen}
        onClose={handleCloseExtractFiltersModal}
        onApplyFilters={handleGenerateExtract}
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <OptionsMenu
          onOpenDeleteModal={handleOpenDeleteModal}
          onOpenExtractFiltersModal={handleOpenExtractFiltersModal}
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex itemsb-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="balance"
              defaultValue="0,00"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  error={errors.balance?.message}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 space-y-2">
          <Input
            type="text"
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                options={[
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente'
                  },
                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos'
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Físico'
                  }
                ]}
                onChange={onChange}
                value={value}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue="0,00"
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                onChange={onChange}
                value={value}
                error={errors.color?.message}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isPending={isPending}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
