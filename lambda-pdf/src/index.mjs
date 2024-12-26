import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

export async function handler(event) {
  try {
    const { bankAccount, transactions, period } = event;

    console.log("Event received:", event);

    const pdfBuffer = await generateExtractPdf({ bankAccount, transactions }, period);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=extrato.pdf',
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao gerar PDF', error: error.message }),
    };
  }
};

async function generateExtractPdf({ bankAccount, transactions }, { month, year }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = new PassThrough();
      const buffers = [];

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

      doc.fontSize(12).font('Helvetica-Bold');
      doc.text(`Conta: ${bankAccount.name}`, startX, y, { width: 200 });
      doc.text(`Saldo atual: ${bankAccount.balance.toFixed(2)}`, startX, y + 20, { width: 200 });
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
        doc.text(formatDate(transaction.date), startX, y, { width: columnWidths.date });
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

      doc.end();

      stream.on('data', (chunk) => buffers.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
      stream.on('error', (err) => reject(err));

      doc.pipe(stream);
    } catch (error) {
      reject(error);
    }
  });
}

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(date));
}