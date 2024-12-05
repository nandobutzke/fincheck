import { TransactionType } from "../../enums/TransactionType";
import { httpClient } from "../httpClient";

export interface UpdateTransactionParams {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionType.INCOME | TransactionType.EXPENSE
}

export async function update({
  id,
  ...params
}: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  console.log('retorno API', data)

  return data;
}
