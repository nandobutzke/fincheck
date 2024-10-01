import { TransactionType } from "../../enums/TransactionType";

export interface Transaction {
  id: string;
  name: string;
  value: number;
  type: TransactionType.INCOME | TransactionType.EXPENSE;
  date: string;
  category?: {
    id: string;
    name: string;
    icon: string;
  }
}
