import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { type Prisma } from "@prisma/client";

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findManyTransactionsDto: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findManyTransactionsDto);
  }

  findFirst(findFirstTransactionDto: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(findFirstTransactionDto);
  }

  create(createTransactionDto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createTransactionDto);
  }

  update(updateTransactionDto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(updateTransactionDto);
  }

  delete(deleteTransactionDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(deleteTransactionDto);
  }
}
