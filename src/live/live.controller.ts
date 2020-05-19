import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';
import { RestoreLiveDto } from './dtos/restore-live.dto';
import { StoreLiveDto } from './dtos/store-live.dto';
import { UpdateLiveDto } from './dtos/update-live.dto';
import { LiveService } from './live.service';

@Controller('lives')
@ApiTags('lives')
@UseGuards(AuthGuard('jwt'))
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const userId = req.user.id;

    const result = await this.liveService.paginate(query);

    return {
      message: 'Show a list of lives',
      object: 'lives',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get a live' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const userId = req.user.id;

    const result = await this.liveService.show(id, userId);

    return {
      message: 'Get a live',
      object: 'live',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a live' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StoreLiveDto, @Req() req) {
    const userId = req.user.id;

    const result = await this.liveService.store(body, userId);

    return {
      message: 'Store a live',
      object: 'live',
      url: req.url,
      data: result,
    };
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'Update a live' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateLiveDto, @Req() req) {
    const userId = req.user.id;

    const result = await this.liveService.update(id, body, userId);

    return {
      message: 'Update a live',
      object: 'live',
      url: req.url,
      data: result,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The public was successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Region not found' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.liveService.destroy(id);

    return {
      message: 'Deleting a live',
      object: 'live',
      url: req.url,
      data: result,
    };
  }

  @Post('restore')
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  @ApiResponse({ status: 404, description: 'Public not found' })
  async restore(@Body() body: RestoreLiveDto, @Req() req) {
    const userId = req.user.id;

    const result = await this.liveService.restore(body.id, userId);

    return {
      message: 'Restore a removed live',
      object: 'live',
      url: req.url,
      data: result,
    };
  }

  @Post(':id/watch')
  @UseGuards(AuthGuard('jwt'))
  async watch(@Param('id', new ParseUUIDPipe()) id: string, @Req() request) {
    const userId = request.user.id;
    const result = await this.liveService.watch(id, userId);
    return {
      message: 'Watching live',
      object: 'live',
      url: request.url,
      data: result,
    };
  }
}
