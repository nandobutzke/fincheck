import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { Response } from "express";
import { PdfGeneratorService } from "./services/pdf-generator.service";
import { CreateTransactionDto as TransactionDto } from "../transactions/dto/create-transaction.dto";

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(
    private readonly bankAccountsService: BankAccountsService,
    private readonly pdfGeneratorService: PdfGeneratorService
  ) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto, @ActiveUserId() userId: string) {
    return this.bankAccountsService.create(createBankAccountDto, userId);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Post('extract')
  generateExtract(
    @ActiveUserId() userId: string,
    @Res() res: Response,
    @Body() transactionsExtractDto: TransactionDto[]
  ) {
    /* const extractData = [
      ['2024-12-01', 'Groceries', 'Faculdade', 'Expense', '$50.00'],
      ['2024-12-02', 'Salary', 'Faculdade', 'Income', '$1,500.00'],
      ['2024-12-03', 'Rent', 'Faculdade', 'Expense', '$800.00'],
    ]; */

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=extract.pdf');

    this.pdfGeneratorService.generateBankAccountTransactionsExtract(transactionsExtractDto, res);
  }

  @Put(':bankAccountId')
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto
  ) {
    return this.bankAccountsService.update(userId, bankAccountId, updateBankAccountDto);
  }

  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.remove(userId, bankAccountId);
  }
}
