import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
    }).compile();

    tokenService = app.get<TokenService>(TokenService);
  });
  describe('test fetchMetadataFromUri', () => {
    it('test json format', async () => {
      const jsonUri =
        'data:application/json;base64,eyJuYW1lIjogIkJhZyAjMSIsICJkZXNjcmlwdGlvbiI6ICJMb290IGlzIHJhbmRvbWl6ZWQgYWR2ZW50dXJlciBnZWFyIGdlbmVyYXRlZCBhbmQgc3RvcmVkIG9uIGNoYWluLiBTdGF0cywgaW1hZ2VzLCBhbmQgb3RoZXIgZnVuY3Rpb25hbGl0eSBhcmUgaW50ZW50aW9uYWxseSBvbWl0dGVkIGZvciBvdGhlcnMgdG8gaW50ZXJwcmV0LiBGZWVsIGZyZWUgdG8gdXNlIExvb3QgaW4gYW55IHdheSB5b3Ugd2FudC4iLCAiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNDhjM1I1YkdVK0xtSmhjMlVnZXlCbWFXeHNPaUIzYUdsMFpUc2dabTl1ZEMxbVlXMXBiSGs2SUhObGNtbG1PeUJtYjI1MExYTnBlbVU2SURFMGNIZzdJSDA4TDNOMGVXeGxQanh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW1Kc1lXTnJJaUF2UGp4MFpYaDBJSGc5SWpFd0lpQjVQU0l5TUNJZ1kyeGhjM005SW1KaGMyVWlQaUpIY21sdElGTm9iM1YwSWlCSGNtRjJaU0JYWVc1a0lHOW1JRk5yYVd4c0lDc3hQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJME1DSWdZMnhoYzNNOUltSmhjMlVpUGtoaGNtUWdUR1ZoZEdobGNpQkJjbTF2Y2p3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlOakFpSUdOc1lYTnpQU0ppWVhObElqNUVhWFpwYm1VZ1NHOXZaRHd2ZEdWNGRENDhkR1Y0ZENCNFBTSXhNQ0lnZVQwaU9EQWlJR05zWVhOelBTSmlZWE5sSWo1SVlYSmtJRXhsWVhSb1pYSWdRbVZzZER3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlNVEF3SWlCamJHRnpjejBpWW1GelpTSStJa1JsWVhSb0lGSnZiM1FpSUU5eWJtRjBaU0JIY21WaGRtVnpJRzltSUZOcmFXeHNQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE1qQWlJR05zWVhOelBTSmlZWE5sSWo1VGRIVmtaR1ZrSUV4bFlYUm9aWElnUjJ4dmRtVnpQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE5EQWlJR05zWVhOelBTSmlZWE5sSWo1T1pXTnJiR0ZqWlNCdlppQkZibXhwWjJoMFpXNXRaVzUwUEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSXhOakFpSUdOc1lYTnpQU0ppWVhObElqNUhiMnhrSUZKcGJtYzhMM1JsZUhRK1BDOXpkbWMrIn0=';
      const data = await tokenService.fetchMetadataFromUri(jsonUri);
      expect(data).toStrictEqual({
        description:
          'Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.',
        image:
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPiJHcmltIFNob3V0IiBHcmF2ZSBXYW5kIG9mIFNraWxsICsxPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI0MCIgY2xhc3M9ImJhc2UiPkhhcmQgTGVhdGhlciBBcm1vcjwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5EaXZpbmUgSG9vZDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJiYXNlIj5IYXJkIExlYXRoZXIgQmVsdDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+IkRlYXRoIFJvb3QiIE9ybmF0ZSBHcmVhdmVzIG9mIFNraWxsPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJiYXNlIj5TdHVkZGVkIExlYXRoZXIgR2xvdmVzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJiYXNlIj5OZWNrbGFjZSBvZiBFbmxpZ2h0ZW5tZW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNjAiIGNsYXNzPSJiYXNlIj5Hb2xkIFJpbmc8L3RleHQ+PC9zdmc+',
        name: 'Bag #1',
      });
    });
    it('test http links', async () => {
      const url =
        'https://arweave.net/7uraOryGQ0_Oj1T0u_VmPL7P8rvxJOsCue7yBxx_P8g';
      const data = await tokenService.fetchMetadataFromUri(url);
      expect(data).toEqual({
        created_by: 'Rare Luca',
        name: 'Pepe Blake',
        description:
          "Series: 1  \nCard: 13  \nArtist: Rare Luca\n\nPEPE'S MOTTO\n\nDoes the Frog know what is in the pit?  \nOr wilt thou go ask Satoshi:  \nCan Wisdom be put in a Dank Meme?  \nOr Love in a Notable Pepe?",
        attributes: [
          { trait_type: 'Artist', value: 'Rare Luca' },
          { trait_type: 'Series', value: '1' },
          { trait_type: 'Card', value: '13' },
        ],
        image_details: {
          bytes: 4916406,
          format: 'JPEG',
          sha256:
            'dd9a3b106a54243a2f7770422e46080dd6a3167ee29e7ec1edbbcadde328b8e9',
          width: 2500,
          height: 3500,
        },
        image:
          'https://arweave.net/Iex_7WQcjaE0Cdk0mZCZPPbxdwi_ssMOoitq67JJZ6Y',
        image_url:
          'https://arweave.net/Iex_7WQcjaE0Cdk0mZCZPPbxdwi_ssMOoitq67JJZ6Y',
      });
    }, 60000);
    it('test ipfs links', async () => {
      const ipfsUrl =
        'ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/123';
      const data = await tokenService.fetchMetadataFromUri(ipfsUrl);
      expect(data).toEqual({
        name: 'Azuki #123',
        image: 'ipfs://QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/123.png',
        attributes: [
          {
            trait_type: 'Type',
            value: 'Human',
          },
          {
            trait_type: 'Hair',
            value: 'Black Disheveled',
          },
          {
            trait_type: 'Face',
            value: 'Eye Scar',
          },
          {
            trait_type: 'Clothing',
            value: 'Black Yukata',
          },
          {
            trait_type: 'Eyes',
            value: 'Meditating',
          },
          {
            trait_type: 'Mouth',
            value: 'Whistling',
          },
          {
            trait_type: 'Offhand',
            value: 'Gloves',
          },
          {
            trait_type: 'Background',
            value: 'Off White A',
          },
        ],
      });
    });
  });
});
