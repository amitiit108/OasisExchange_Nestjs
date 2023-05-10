import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @GrpcMethod('TransactionService', 'AddTransaction')
  async addTransaction(data) {
    try {
      const transaction = await this.transactionsService.create(data);
      return { transaction };
    } catch (error) {
      throw new RpcException({ message: error.message });
    }
  }

  @GrpcMethod('TransactionService', 'GetTransaction')
  async getTransaction({ id }) {
    try {
      const transaction = await this.transactionsService.findOne(id);
      return { transaction };
    } catch (error) {
      throw new RpcException({ message: error.message });
    }
  }

  @GrpcMethod('TransactionService', 'UpdateTransaction')
  async updateTransaction({ id, field, value }) {
    try {
      const data = { [field]: value };
      const transaction = await this.transactionsService.update(id, data);
      return { transaction };
    } catch (error) {
      throw new RpcException({ message: error.message });
    }
  }

  @GrpcMethod('TransactionService', 'DeleteTransaction')
  async deleteTransaction({ id }) {
    try {
      const success = await this.transactionsService.remove(id);
      return { success };
    } catch (error) {
      throw new RpcException({ message: error.message });
    }
  }
}
