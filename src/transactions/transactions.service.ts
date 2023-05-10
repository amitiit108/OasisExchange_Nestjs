import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    try {
      return await this.prisma.transaction.create({
        data,
      });
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const transaction = await this.prisma.transaction.findUnique({
        where: { id },
      });

      if (!transaction) {
        throw new NotFoundException(`Transaction with id ${id} not found`);
      }

      return transaction;
    } catch (error) {
      throw new Error(`Failed to find transaction: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.transaction.findMany();
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }
  }

  async update(id: number, data) {
    try {
      const transaction = await this.prisma.transaction.update({
        where: { id },
        data,
      });

      if (!transaction) {
        throw new NotFoundException(`Transaction with id ${id} not found`);
      }

      return transaction;
    } catch (error) {
      throw new Error(`Failed to update transaction: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const transaction = await this.prisma.transaction.delete({
        where: { id },
      });

      if (!transaction) {
        throw new NotFoundException(`Transaction with id ${id} not found`);
      }

      return true;
    } catch (error) {
      throw new Error(`Failed to delete transaction: ${error.message}`);
    }
  }
}
