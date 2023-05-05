import { Controller, Get, Query } from '@nestjs/common';
import { IGetMetadataResp } from './app.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('metadata')
  getMetadata(
    @Query('collection') collection: string,
    @Query('tokenId') tokenId: string,
  ): Promise<IGetMetadataResp> {
    return this.appService.getMetadata(collection, tokenId);
  }
}
