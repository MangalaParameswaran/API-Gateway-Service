import { Test, TestingModule } from '@nestjs/testing';
import { GatewayAuthService } from './gateway-auth.service';

describe('GatewayAuthService', () => {
  let service: GatewayAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayAuthService],
    }).compile();

    service = module.get<GatewayAuthService>(GatewayAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
