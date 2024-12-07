import { Controller } from "react-hook-form";
import { Button } from "../../../components/Button";
import { ColorsDropdownInput } from "../../../components/ColorsDropdownInput";
import { Input } from "../../../components/Input";
import { InputCurrency } from "../../../components/InputCurrency";
import { Modal } from "../../../components/Modal";
import { Select } from "../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    reset,
    isNewAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isPending
  } = useNewAccountModalController();

  function handleClose() {
    closeNewAccountModal();
    reset();
  }

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex itemsb-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="balance"
              defaultValue="0"
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
            defaultValue=""
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
          Criar
        </Button>
      </form>
    </Modal>
  )
}
