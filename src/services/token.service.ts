import { Injectable, Logger, Optional } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { readUriAsNftToken } from '../utils/token-readers';

@Injectable()
export class TokenService {
  constructor(@Optional() private readonly redisService?: RedisService) {}

  async fetchMetadataFromUri(tokenUri: string): Promise<Object> {
    Logger.debug(`TokenService.fetchMetadataFromUri(${tokenUri})`);
    if (this.redisService) {
      const redisClient = this.redisService.getClient();
      const persistData = await redisClient.get(tokenUri);
      if (persistData) {
        return JSON.parse(persistData);
      }
      Logger.log(`token Uri ${tokenUri} cache hit`);
    }
    const data = await readUriAsNftToken(tokenUri);
    if (!data) {
      return null;
    }
    if (this.redisService) {
      const redisClient = this.redisService.getClient();
      await redisClient.set(tokenUri, JSON.stringify(data));
    }
    return data;
  }
}
