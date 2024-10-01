import { TransactionType } from "../../enums/TransactionType";

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: TransactionType.INCOME | TransactionType.EXPENSE;
}
