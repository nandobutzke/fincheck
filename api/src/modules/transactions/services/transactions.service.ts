import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from '../services/validate-transaction-ownership.service';
import { TransactionType } from "../entities/Transaction";
import { BankAccountsRepository } from "src/shared/database/repositories/bankAccounts.repository";
import { CategoriesRepository } from "src/shared/database/repositories/categories.repository";

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly categoriesRepo: CategoriesRepository,
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

    await this.calculateNewBalanceBankAccountAndUpdate(
      bankAccountId,
      type,
      value,
      true
    );

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

  async findAllForExtract(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId: string;
      type?: TransactionType;
  }) {
    const transactionsByUser = await this.findAllByUserId(userId, filters);
    const bankAccount = await this.bankAccountsRepo.findFirst({
      where: {
        id: filters.bankAccountId
      }
    })

    const transactions = await Promise.all(transactionsByUser.map(async ({ date, name, type, value, categoryId }) => {
      const category = await this.categoriesRepo.findFirst({
        where: { userId, id: categoryId },
      })

      return {
        date,
        category: category.name,
        name,
        type,
        value,
      };
    }))

    return {
      transactions,
      bankAccount
    }
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, name, value, type, date } = updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    const { value: oldValue } = await this.transactionsRepo.findFirst({
      where: { id: transactionId }
    });

    const updatedTransaction = await this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        name,
        value,
        type,
        date,
        bankAccountId,
        categoryId
      }
    });

    const difference = oldValue - value;

    await this.calculateNewBalanceBankAccountAndUpdate(
      bankAccountId,
      type,
      difference
    );

    return updatedTransaction;
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId
    });

    const { bankAccountId, type, value } = await this.transactionsRepo.findFirst({
      where: {
        id: transactionId
      }
    })

    await this.calculateNewBalanceBankAccountAndUpdate(
      bankAccountId,
      type as TransactionType,
      value
    )

    await this.transactionsRepo.delete({
      where: { id: transactionId }
    });

    return null;
  }

  private async calculateNewBalanceBankAccountAndUpdate(
    bankAccountId: string,
    transactionType: TransactionType,
    differenceForBalanceAdjustment: number,
    isCreatingTransaction = false
  ) {
    const { balance } = await this.bankAccountsRepo.findFirst({
      where: {
        id: bankAccountId
      }
    });

    let adjustmentForTheBalanceAccount = 0;

    const isExpense = transactionType === TransactionType.EXPENSE;

    const balanceAdjustment =
      isCreatingTransaction
        ? -differenceForBalanceAdjustment
        : differenceForBalanceAdjustment;

    const reverseBalanceAdjustment =
      isCreatingTransaction
        ? differenceForBalanceAdjustment
        : -differenceForBalanceAdjustment;

    if (isExpense) {
      adjustmentForTheBalanceAccount = balanceAdjustment
    } else {
      adjustmentForTheBalanceAccount = reverseBalanceAdjustment
    }

    const currentBalance = balance + adjustmentForTheBalanceAccount;

    await this.bankAccountsRepo.updateBalance(bankAccountId, currentBalance);
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
