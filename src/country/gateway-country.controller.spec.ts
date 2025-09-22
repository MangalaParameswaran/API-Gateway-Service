import { Test, TestingModule } from '@nestjs/testing';
import { GatewayCountryController } from './gateway-country.controller';
import { GatewayCountryService } from './gateway-country.service';

describe('GatewayCountryController', () => {
  let controller: GatewayCountryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayCountryController],
      providers: [GatewayCountryService],
    }).compile();

    controller = module.get<GatewayCountryController>(GatewayCountryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
