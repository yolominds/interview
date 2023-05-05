import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthersService } from './services/ethers.service';
import { TokenService } from './services/token.service';
const REMOTE_RPC_URL =
  'https://eth-mainnet.g.alchemy.com/v2/KN9ZQRRwuXkdSoEYwvON7BbqZ08oxjwB';
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        TokenService,
        {
          provide: EthersService,
          useFactory: async (tokenService: TokenService) => {
            return await EthersService.createEthersService(
              REMOTE_RPC_URL,
              tokenService,
            );
          },
          inject: [TokenService],
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the example in READEME.md', async () => {
      const metadata = await appController.getMetadata(
        '0x23581767a106ae21c074b2276d25e5c3e136a68b',
        '2100',
      );
      expect(metadata).toEqual({
        success: true,
        data: {
          name: '#2100',
          image: 'https://live---metadata-5covpqijaa-uc.a.run.app/images/2100',
          external_url: 'https://www.proof.xyz/moonbirds/2100',
          x_debug: ['orig:3109'],
          attributes: [
            {
              trait_type: 'Eyes',
              value: 'Open',
            },
            {
              trait_type: 'Headwear',
              value: 'Fire',
            },
            {
              trait_type: 'Body',
              value: 'Crescent',
            },
            {
              trait_type: 'Feathers',
              value: 'Pink',
            },
            {
              trait_type: 'Background',
              value: 'Yellow',
            },
            {
              trait_type: 'Beak',
              value: 'Long',
            },
          ],
        },
      });
    }, 60000);
  });
});
