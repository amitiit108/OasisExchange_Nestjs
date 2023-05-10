import { Controller, Get, Post, Put, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { Transaction } from '../transactions/transaction.entity';

@Controller('api/v1/transactions')
export class TransactionsApiController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    const parsedId = parseInt(id, 10);
    const transaction = await this.transactionsService.findOne(parsedId);
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${parsedId} not found`);
    }
    return transaction;
  }

  @Post()
  async create(@Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionsService.create(transaction);
  }

  @Put(':id')
  async updateTransaction(@Param('id') id: string, @Body() transactionUpdateInput: Transaction): Promise<Transaction> {
    const parsedId = parseInt(id, 10);
    return this.transactionsService.update(parsedId, transactionUpdateInput);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string): Promise<boolean> {
    const parsedId = parseInt(id, 10);
    return this.transactionsService.remove(parsedId);
  }
}
