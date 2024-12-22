import { $Enums } from "@prisma/client";

export interface Extract {
  bankAccount: any
  transactions: Transaction[]
}

type Transaction = {
  date: Date,
  name: string,
  category: string,
  type: $Enums.TransationType
  value: number
}
