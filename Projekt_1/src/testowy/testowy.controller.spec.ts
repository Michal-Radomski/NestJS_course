import { Test, TestingModule } from '@nestjs/testing';
import { TestowyController } from './testowy.controller';

describe('TestowyController', () => {
  let controller: TestowyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestowyController],
    }).compile();

    controller = module.get<TestowyController>(TestowyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
