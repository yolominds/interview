import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthersService } from './services/ethers.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    process.env.REDIS_DISABLED
      ? RedisModule.forRoot({
          config: {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
          },
        })
      : null,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TokenService,
    {
      provide: EthersService,
      useFactory: async (tokenService: TokenService) => {
        const service = await EthersService.createEthersService(
          process.env.ETH_RPC_URL,
          tokenService,
        );
        return service;
      },
      inject: [TokenService],
    },
  ],
})
export class AppModule {}
