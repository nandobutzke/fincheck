import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, Query, ParseIntPipe, Res } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import OptionalParseUUIDPipe from "src/shared/pipes/OptionalParseUUIDPipe";
import { TransactionType } from "./entities/Transaction";
import OptionalParseEnumPipe from "src/shared/pipes/OptionalParseEnumPipe";
import { PdfService } from "./services/pdf.service";
import { Response } from "express";

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly pdfService: PdfService
  ) {}

  @Post()
  create(@ActiveUserId() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(TransactionType)) type?: TransactionType,
  ) {
    return this.transactionsService.findAllByUserId(userId, { month, year, bankAccountId, type });
  }

  @Get('extract')
  async generateExtractPdf(
    @ActiveUserId() userId: string,
    @Res() res: Response,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(TransactionType)) type?: TransactionType,
  ) {
    const filters = { month, year, bankAccountId, type };

    console.log({ filters })

    const data = await this.transactionsService.findAllForExtract(userId, filters);

    console.log({ transactions: data.transactions })


    const extract = await this.pdfService.generateExtract(data, { month, year })

    const pdfBuffer = Buffer.from(extract.body, 'base64');

    res.set({
      'Content-Type': extract.headers['Content-Type'],
      'Content-Disposition': extract.headers['Content-Disposition'],
    });

    res.send(pdfBuffer);
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this.transactionsService.update(userId, transactionId, updateTransactionDto);
  }

  @Delete(':transactionId')
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
