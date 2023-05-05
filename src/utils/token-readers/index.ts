import { Logger } from '@nestjs/common';
import { base64Reader } from './base64-reader';
import { httpReader } from './http-reader';
import { ipfsReader } from './ipfs-reader';
import { ITokenReader } from './types';

export const tokenReaders: ITokenReader[] = [
  base64Reader,
  httpReader,
  ipfsReader,
];
export async function readUriAsNftToken(uri: string): Promise<Object | null> {
  for (const reader of tokenReaders) {
    if (reader.isSupport(uri)) {
      Logger.verbose(`reading sub metadata by ${uri}`);
      return reader.read(uri);
    }
  }
  return null;
}
