import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ArgumentsHost, ExceptionFilter, ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Create the gRPC microservice
  const grpcServer = await app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_URL,
      package: 'transaction',
      protoPath: join(__dirname, '../transaction.proto'),
    },
  });

  // Start the gRPC server
  await app.startAllMicroservices();

  // Add a global error handler
  app.useGlobalFilters(new ErrorFilter());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Define the error filter class
class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Log the error
    console.error(exception);

    // Send a custom error response
    response.status(500).json({
      message: 'Internal server error',
    });
  }
}

bootstrap();
