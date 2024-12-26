import { TransactionsFilters } from "../../@types/TransactionsFilters";
import { httpClient } from "../httpClient";

export async function generateExtract(filters: TransactionsFilters) {
  return httpClient.get('/transactions/extract', { params: filters, responseType: 'blob' })
}
