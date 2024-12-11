import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateBankAccountOwnershipService } from './services/validate-bank-account-ownership.service';
import { PdfGeneratorService } from "./services/pdf-generator.service";

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountOwnershipService, PdfGeneratorService],
  exports: [ValidateBankAccountOwnershipService, PdfGeneratorService]
})
export class BankAccountsModule {}
