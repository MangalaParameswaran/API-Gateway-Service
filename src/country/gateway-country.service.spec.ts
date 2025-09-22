import { Test, TestingModule } from '@nestjs/testing';
import { GatewayCountryService } from './gateway-country.service';

describe('GatewayCountryService', () => {
  let service: GatewayCountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayCountryService],
    }).compile();

    service = module.get<GatewayCountryService>(GatewayCountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
