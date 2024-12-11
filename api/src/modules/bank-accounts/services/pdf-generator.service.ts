import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { CreateTransactionDto as TransactionDto } from "src/modules/transactions/dto/create-transaction.dto";
import { CategoriesRepository } from "src/shared/database/repositories/categories.repository";
import { Writable } from 'stream';


@Injectable()
export class PdfGeneratorService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async generateBankAccountTransactionsExtract(transactions: TransactionDto[], writableStream: Writable): Promise<void> {
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(writableStream);

    doc.fontSize(18).text('Transações', { align: 'center' });
    doc.moveDown();

    const table = {
      headers: ['Data', 'Nome',  'Categoria', 'Tipo', 'Valor'],
      rows: transactions,
      columnWidths: [125, 100, 100, 75, 100],
    };

    const startX = 50;
    let startY = doc.y;

    table.headers.forEach((header, i) => {
      const x = startX + table.columnWidths.slice(0, i).reduce((a, b) => a + b, 0);

      doc.fontSize(12).font('Helvetica-Bold').text(header, x, startY, {
        width: table.columnWidths[i],
        align: 'center',
      });
    });

    doc.moveTo(startX, startY + 20).lineTo(550, startY + 20).stroke("#12B886");

    startY += 30;

    doc.font('Helvetica');

    table.rows.forEach(({ bankAccountId,
      categoryId,
      name,
      value,
      date,
      type
    }) => {

      const category = this.categoriesRepository.findFirst({
        where: {
          id: categoryId
        }
      })

      const cells = {
        date,
        name,
        category:
        type,
        value: value.toString(),
      };

      Object.entries(cells).forEach(([cell], i) => {
        const x = startX + table.columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
        doc.text(cell, x, startY, {
          width: table.columnWidths[i],
          align: 'center',
        });
      });

      startY += 20;
    });

    doc.end();
  }
}
