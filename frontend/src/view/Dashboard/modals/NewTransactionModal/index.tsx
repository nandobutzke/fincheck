import { Controller } from "react-hook-form";
import { Button } from "../../../components/Button";
import { DatePickerInput } from "../../../components/DatePickerInput";
import { Input } from "../../../components/Input";
import { InputCurrency } from "../../../components/InputCurrency";
import { Modal } from "../../../components/Modal";
import { Select } from "../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { TransactionType } from "../../../../enums/TransactionType";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    reset,
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isPending
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === TransactionType.EXPENSE;

  function handleClose() {
    closeNewTransactionModal();
    reset();
  }

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 space-y-2">
          <Input
            type="text"
            error={errors.name?.message}
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" onClick={handleSubmit} isPending={isPending}>
          Criar
        </Button>
      </form>
    </Modal>
  )
}
