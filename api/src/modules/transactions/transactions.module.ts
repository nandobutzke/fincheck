import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';
import { BankAccountsService } from "../bank-accounts/services/bank-accounts.service";
import { CategoriesService } from "../categories/services/categories.service";
import { PdfService } from "./services/pdf.service";

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnershipService, BankAccountsService, CategoriesService, PdfService]
})
export class TransactionsModule {}
