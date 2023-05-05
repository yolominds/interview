import { Test, TestingModule } from '@nestjs/testing';
import { EthersService } from './ethers.service';
import { TokenService } from './token.service';
const REMOTE_RPC_URL =
  'https://eth-mainnet.g.alchemy.com/v2/KN9ZQRRwuXkdSoEYwvON7BbqZ08oxjwB';
describe('EthersService', () => {
  let ethersService: EthersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
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

    ethersService = app.get<EthersService>(EthersService);
  });

  describe('basics', () => {
    it('should init finished', async () => {
      expect(ethersService.rpcUrl).toBe(REMOTE_RPC_URL);
      expect(ethersService.initFinished).toBe(true);
    });
    it('read nft token as uri', async () => {
      // this nft is ERC721
      let nftInfo = await ethersService.readNftTokenUri(
        '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
        '123',
      );
      expect(nftInfo).toBe(
        'ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/123',
      );
      // this nft is ERC1155
      nftInfo = await ethersService.readNftTokenUri(
        '0xe70659b717112AC4e14284d0db2f5d5703dF8e43',
        '14',
      );
      expect(nftInfo).toBe(
        'https://arweave.net/7uraOryGQ0_Oj1T0u_VmPL7P8rvxJOsCue7yBxx_P8g',
      );
      // this nft use ERC721 but with long metadata string
      nftInfo = await ethersService.readNftTokenUri(
        '0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7',
        '1',
      );
      expect(nftInfo).toBe(
        'data:application/json;base64,eyJuYW1lIjogIkJhZyAjMSIsICJkZXNjcmlwdGlvbiI6ICJMb290IGlzIHJhbmRvbWl6ZWQgYWR2ZW50dXJlciBnZWFyIGdlbmVyYXRlZCBhbmQgc3RvcmVkIG9uIGNoYWluLiBTdGF0cywgaW1hZ2VzLCBhbmQgb3RoZXIgZnVuY3Rpb25hbGl0eSBhcmUgaW50ZW50aW9uYWxseSBvbWl0dGVkIGZvciBvdGhlcnMgdG8gaW50ZXJwcmV0LiBGZWVsIGZyZWUgdG8gdXNlIExvb3QgaW4gYW55IHdheSB5b3Ugd2FudC4iLCAiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNDhjM1I1YkdVK0xtSmhjMlVnZXlCbWFXeHNPaUIzYUdsMFpUc2dabTl1ZEMxbVlXMXBiSGs2SUhObGNtbG1PeUJtYjI1MExYTnBlbVU2SURFMGNIZzdJSDA4TDNOMGVXeGxQanh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW1Kc1lXTnJJaUF2UGp4MFpYaDBJSGc5SWpFd0lpQjVQU0l5TUNJZ1kyeGhjM005SW1KaGMyVWlQaUpIY21sdElGTm9iM1YwSWlCSGNtRjJaU0JYWVc1a0lHOW1JRk5yYVd4c0lDc3hQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJME1DSWdZMnhoYzNNOUltSmhjMlVpUGtoaGNtUWdUR1ZoZEdobGNpQkJjbTF2Y2p3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlOakFpSUdOc1lYTnpQU0ppWVhObElqNUVhWFpwYm1VZ1NHOXZaRHd2ZEdWNGRENDhkR1Y0ZENCNFBTSXhNQ0lnZVQwaU9EQWlJR05zWVhOelBTSmlZWE5sSWo1SVlYSmtJRXhsWVhSb1pYSWdRbVZzZER3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlNVEF3SWlCamJHRnpjejBpWW1GelpTSStJa1JsWVhSb0lGSnZiM1FpSUU5eWJtRjBaU0JIY21WaGRtVnpJRzltSUZOcmFXeHNQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE1qQWlJR05zWVhOelBTSmlZWE5sSWo1VGRIVmtaR1ZrSUV4bFlYUm9aWElnUjJ4dmRtVnpQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE5EQWlJR05zWVhOelBTSmlZWE5sSWo1T1pXTnJiR0ZqWlNCdlppQkZibXhwWjJoMFpXNXRaVzUwUEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSXhOakFpSUdOc1lYTnpQU0ppWVhObElqNUhiMnhrSUZKcGJtYzhMM1JsZUhRK1BDOXpkbWMrIn0=',
      );
    });

    it('read nft raw metadata', async () => {
      // this nft is ERC721
      // let nftInfo = await ethersService.readNftMetadata(
      //   '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
      //   '123',
      // );
      // expect(nftInfo).toBe(
      //   'ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/123',
      // );
      // // this nft is ERC1155
      // nftInfo = await ethersService.readNftTokenUri(
      //   '0xe70659b717112AC4e14284d0db2f5d5703dF8e43',
      //   '14',
      // );
      // expect(nftInfo).toBe(
      //   'https://arweave.net/7uraOryGQ0_Oj1T0u_VmPL7P8rvxJOsCue7yBxx_P8g',
      // );
    });
  });
});
