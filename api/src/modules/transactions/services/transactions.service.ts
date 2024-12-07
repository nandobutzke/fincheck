import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from '../services/validate-transaction-ownership.service';
import { TransactionType } from "../entities/Transaction";
import { BankAccountsRepository } from "src/shared/database/repositories/bankAccounts.repository";
import { $Enums } from "@prisma/client";

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, name, value, date, type } = createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId
    });

    const currentBalance = await this.validateBalanceAccountUpdate(bankAccountId, value, type);

    await this.bankAccountsRepo.updateBalance(bankAccountId, currentBalance);

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type
      }
    });
  }

  private async validateBalanceAccountUpdate(bankAccountId: string, value: number, type: TransactionType) {
    const { balance } = await this.bankAccountsRepo.findFirst({
      where: {
        id: bankAccountId
      }
    });

    let currentBalance = balance;

    if (type === TransactionType.EXPENSE) {
      currentBalance -= value;
    } else {
      currentBalance += value;
    }

    return currentBalance;
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    }) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1))
        }
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          }
        }
      }
    });
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, name, value, type, date } = updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    await this.validateBalanceAfterUpdatingTransactions(transactionId, bankAccountId, type, value)

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        name,
        value,
        type,
        date,
        bankAccountId,
        categoryId
      }
    });;
  }

  private async validateBalanceAfterUpdatingTransactions(
    transactionId: string,
    bankAccountId: string,
    type: TransactionType,
    updatedValue: number
  ) {
    const transactionBeingUpdated = await this.transactionsRepo.findFirst({
      where: { id: transactionId }
    });

    const valueForBalanceCalculation = -(transactionBeingUpdated.value - updatedValue);

    const currentBalance = await this.validateBalanceAccountUpdate(bankAccountId, valueForBalanceCalculation, type);

    await this.bankAccountsRepo.updateBalance(bankAccountId, currentBalance);
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId
    });

    const transactionBeingDeleted = await this.transactionsRepo.findFirst({
      where: { id: transactionId }
    });

    const { bankAccountId, type, value } = transactionBeingDeleted;

    await this.validateBalanceAfterUpdatingTransactions(
      transactionId,
      bankAccountId,
      type as TransactionType,
      value
    );

    await this.transactionsRepo.delete({
      where: { id: transactionId }
    });

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId
  }: {
    userId: string,
    bankAccountId?: string,
    categoryId?: string,
    transactionId?: string
  }) {
    await Promise.all([
      bankAccountId && this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      categoryId && this.validateCategoryOwnershipService.validate(userId, categoryId),
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId)
    ])
  }
}
