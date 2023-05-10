import { Prisma } from '@prisma/client';

export class Transaction implements Prisma.TransactionUncheckedCreateInput {
  id?: number;
  timestamp: Date;
  user_id: string;
  crypto_name: string;
  amount: number;
  transaction_type: string;
}
