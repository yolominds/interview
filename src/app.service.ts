import { Logger, Optional } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { IGetMetadataResp } from './app.interface';
import { EthersService } from './services/ethers.service';

@Injectable()
export class AppService {
  constructor(private readonly ethersService: EthersService) {}
  async getMetadata(
    collection: string,
    tokenId: string,
  ): Promise<IGetMetadataResp> {
    try {
      const nftMeta: any = await this.ethersService.readNftMetadata(
        collection,
        tokenId,
      );
      return {
        success: true,
        data: nftMeta,
      };
    } catch (err) {
      Logger.error(err);
      return {
        success: false,
        data: {
          message: String(err),
        },
      };
    }
  }
}
