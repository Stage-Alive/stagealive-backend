import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ArtistService } from './artist.service';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Post()
  @ApiResponse({ status: 201, description: 'Store a Artist' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body, @Req() req) {
    const result = await this.artistService.store(body);

    return {
      message: 'Store an Artist',
      object: 'artist',
      url: req.url,
      data: result,
    };
  }
}
