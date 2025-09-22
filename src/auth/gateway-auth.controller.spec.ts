import { Test, TestingModule } from '@nestjs/testing';
import { GatewayAuthController } from './gateway-auth.controller';
import { GatewayAuthService } from './gateway-auth.service';

describe('GatewayAuthController', () => {
  let controller: GatewayAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayAuthController],
      providers: [GatewayAuthService],
    }).compile();

    controller = module.get<GatewayAuthController>(GatewayAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
