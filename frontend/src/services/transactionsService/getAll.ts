import { TransactionsFilters } from "../../@types/TransactionsFilters";
import { Transaction } from "../../app/entities/Transaction";
import { httpClient } from "../httpClient";

type TransactionsResponse = Array<Transaction>;

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', { params: filters });

  return data;
}
