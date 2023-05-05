import { Logger } from '@nestjs/common';
import { ITokenReader } from './types';
const regex = /^https?:\/\//;
export const httpReader: ITokenReader = {
  isSupport: (uri: string) => {
    return regex.test(uri);
  },
  read: async (uri: string) => {
    let selfHostedMetadata: Response;
    try {
      selfHostedMetadata = await fetch(uri);
    } catch (err) {
      Logger.error(`fetch data from Uri error: ${err}`);
      return {
        error: String(err),
      };
    }
    try {
      return await selfHostedMetadata.json();
    } catch (err) {
      Logger.error(`fetch data from Uri error: ${err}`);
      const text = await selfHostedMetadata.text();
      if (text) {
        return {
          text: text,
        };
      }
    }
  },
};
