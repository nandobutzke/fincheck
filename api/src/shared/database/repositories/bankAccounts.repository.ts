import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { type Prisma } from "@prisma/client";
import { TransactionType } from "src/modules/transactions/entities/Transaction";

type BankAccountFindManyWithTransactionsDto<T> = Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany<T extends Prisma.BankAccountFindManyArgs>(
    findManyBankAccountsDto: BankAccountFindManyWithTransactionsDto<T>
  ) {
    return this.prismaService.bankAccount.findMany(findManyBankAccountsDto);
  }

  findFirst(findFirstBankAccountDto: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(findFirstBankAccountDto);
  }

  create(createBankAccountDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createBankAccountDto);
  }

  update(updateBankAccountDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateBankAccountDto);
  }

  updateBalance(id: string, currentBalance: number) {
    return this.prismaService.bankAccount.update({
      where: { id },
      data: { balance: currentBalance },
    });
  }

  delete(deleteBankAccountDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(deleteBankAccountDto);
  }
}
