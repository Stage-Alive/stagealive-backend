import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';
import { StoreArtistDto } from './dtos/store-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { RestoreArtistDto } from './dtos/restore-artist.dto';

@Controller('artists')
@ApiTags('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Store a Artist' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StoreArtistDto, @Req() req) {
    const result = await this.artistService.store(body);

    return {
      message: 'Store an Artist',
      object: 'artist',
      url: req.url,
      data: result,
    };
  }

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.artistService.paginate(query);

    return {
      message: 'Show a list of artists',
      object: 'artist',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get an artist' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.artistService.show(id);

    return {
      message: 'Get an artist',
      object: 'artist',
      url: req.url,
      data: result,
    };
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'Update an artist' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateArtistDto,
    @Req() req,
  ) {
    const result = await this.artistService.update(id, body);

    return {
      message: 'Update an artist',
      object: 'artist',
      url: req.url,
      data: result,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The artist was successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.artistService.destroy(id);

    return {
      message: 'Deleting an artist',
      object: 'Artist',
      url: req.url,
      data: result,
    };
  }

  @Post('restore')
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async restore(@Body() body: RestoreArtistDto, @Req() req) {
    const result = await this.artistService.restore(body.id);

    return {
      message: 'Restore a removed artist',
      object: 'live',
      url: req.url,
      data: result,
    };
  }
}
