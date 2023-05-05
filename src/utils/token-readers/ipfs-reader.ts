import { Logger } from '@nestjs/common';
import { ITokenReader } from './types';
const MAX_IPFS_LEN = 1000 * 1000;
const regex = /^ipfs:\/\//;
export const ipfsReader: ITokenReader = {
  isSupport: (uri: string) => {
    return regex.test(uri);
  },
  read: async (uri: string) => {
    const ipfsUrl = uri.replace(regex, 'https://ipfs.io/ipfs/');
    let selfHostedMetadata: Response;
    try {
      selfHostedMetadata = await fetch(ipfsUrl);
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
