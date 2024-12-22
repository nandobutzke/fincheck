import * as PDFDocument from 'pdfkit';
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda"
import { Injectable } from '@nestjs/common';
import { Stream } from 'stream';
import { Extract } from "src/shared/@types/Extract";

interface Period {
  month: number;
  year: number;
}

@Injectable()
export class PdfService {
  private lambdaClient: LambdaClient;

  constructor() {
    this.lambdaClient = new LambdaClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async generateExtract({ bankAccount, transactions }: Extract, { month, year }: Period) {
    const command = new InvokeCommand({
      FunctionName: 'generateTransactionsExtract',
      Payload: Buffer.from(JSON.stringify({
        bankAccount,
        transactions,
        period: {
          month,
          year
        }
      }))
    });

    try {
      const response = await this.lambdaClient.send(command);

      if (response.Payload) {
        return JSON.parse(Buffer.from(response.Payload).toString());
      }

      return null;
    } catch (error) {
      console.error('Error invoking Lambda:', error);
      throw error;
    }

    /* const doc = new PDFDocument();
    const stream = new Stream.PassThrough();

    doc.pipe(stream);

    const date = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })
    .format(new Date(year, month))
    .replace(' de ', '/');

    const startX = 50;

    doc.fontSize(16).text(`Extrato das transações do período ${date}`, startX, doc.y, { align: 'left' });
    doc.moveDown();

    const columnWidths = {
      date: 100,
      name: 150,
      category: 100,
      type: 50,
      value: 100,
    };

    let y = doc.y;

    doc.fontSize(12).font('Helvetica-Bold')
    doc.text(`Conta: ${bankAccount.name}`, startX, y, { width: 200 });
    doc.text(`Saldo Atual: ${bankAccount.balance.toFixed(2)}`, startX, y + 20, { width: 200 });
    doc.moveDown();
    y += 40;

    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('Data', startX, y, { width: columnWidths.date });
    doc.text('Nome', startX + columnWidths.date, y, { width: columnWidths.name });
    doc.text('Categoria', startX + columnWidths.date + columnWidths.name, y, { width: columnWidths.category });
    doc.text('Tipo', startX + columnWidths.date + columnWidths.name + columnWidths.category, y, { width: columnWidths.type });
    doc.text('Valor', startX + columnWidths.date + columnWidths.name + columnWidths.category + columnWidths.type, y, {
      width: columnWidths.value,
      align: 'right',
    });
    y += 20;

    doc.font('Helvetica').fontSize(10);
    transactions.forEach((transaction) => {
      doc.text(this.formatDate(transaction.date.toISOString()), startX, y, { width: columnWidths.date });
      doc.text(transaction.name, startX + columnWidths.date, y, { width: columnWidths.name });
      doc.text(transaction.category, startX + columnWidths.date + columnWidths.name, y, { width: columnWidths.category });
      doc.text(transaction.type, startX + columnWidths.date + columnWidths.name + columnWidths.category, y, {
        width: columnWidths.type,
      });
      doc.text(transaction.value.toFixed(2), startX + columnWidths.date + columnWidths.name + columnWidths.category + columnWidths.type, y, {
        width: columnWidths.value,
        align: 'right',
      });
      y += 20;
    });

    doc.text('', { paragraphGap: 20 })

    doc.moveDown();

    doc.end();
    return stream; */
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(formattedDate);
  }
}
