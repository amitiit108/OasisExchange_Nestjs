import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsService } from './transactions/transactions.service';
import { PrismaService } from './prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsApiController } from './transactions-api/transactions-api.controller';



@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSACTION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000',
          package: 'transaction',
          protoPath: join(__dirname, '../transaction.proto'),
          loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
          },
          channelOptions: {
            'grpc.max_receive_message_length': 1024 * 1024 * 100,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, TransactionsController, TransactionsApiController],
  providers: [AppService, TransactionsService,PrismaService],
})
export class AppModule {}
