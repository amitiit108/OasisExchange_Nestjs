import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsApiController } from './transactions-api.controller';

describe('TransactionsApiController', () => {
  let controller: TransactionsApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsApiController],
    }).compile();

    controller = module.get<TransactionsApiController>(TransactionsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
