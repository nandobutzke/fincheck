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
