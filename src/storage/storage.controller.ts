import { Controller, Post, Body, Req } from '@nestjs/common';
import { StorageService } from './storage.service';
import { SignUrlDto } from './dto/sign-url.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('storages')
@ApiTags('storages')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  async getSignURL(@Body() data: SignUrlDto, @Req() req) {
    const result = this.storageService.getSignURL(data);
    return {
      message: 'Get a sign url for put S3 -- expires 1 hour',
      object: 'string',
      url: req.url,
      data: result,
    };
  }
}
