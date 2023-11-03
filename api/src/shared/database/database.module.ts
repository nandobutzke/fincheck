import { Module, Global } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repository';
import { BankAccountsRepository } from './repositories/bankAccounts.repository';
import { TransactionsRepository } from './repositories/transactions.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository
  ],
  exports: [UsersRepository, CategoriesRepository, BankAccountsRepository, TransactionsRepository]
})
export class DatabaseModule {}
