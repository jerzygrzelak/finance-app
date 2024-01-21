import { PrismaClient, Currency } from '@prisma/client';
import * as fs from 'fs';
import { resolve } from 'path';
const prisma = new PrismaClient();

async function main() {
  const data = fs.readFileSync(
    resolve(__dirname, './currencies.json'),
    'utf-8',
  );
  const currencies: Currency[] = JSON.parse(data);
  for (const currency of currencies) {
    await prisma.currency.create({
      data: {
        symbol: currency.symbol,
        code: currency.code,
        name: currency.name,
        namePlural: currency.namePlural,
      },
    });
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
