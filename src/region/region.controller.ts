import { RegionService } from './region.service';
import {
  Get,
  Body,
  Req,
  Query,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Controller,
  Delete,
} from '@nestjs/common';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreRegionDto } from './dtos/store-region.dto';
import { UpdateRegionDto } from './dtos/update-region.dto';
import { RestoreRegionDto } from './dtos/restore-region.dto';

@Controller('regions')
@ApiTags('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.regionService.paginate(query);

    return {
      message: 'Show a list of region',
      object: 'Region',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get a region' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.regionService.show(id);

    return {
      message: 'Get an region',
      object: 'Region',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a region' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StoreRegionDto, @Req() req) {
    const result = await this.regionService.store(body);

    return {
      message: 'Store a region',
      object: 'region',
      url: req.url,
      data: result,
    };
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'Update a region' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateRegionDto,
    @Req() req,
  ) {
    const result = await this.regionService.update(id, body);

    return {
      message: 'Update an region',
      object: 'Region',
      url: req.url,
      data: result,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The region was successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Region not found' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.regionService.destroy(id);

    return {
      message: 'Deleting a region',
      object: 'Region',
      url: req.url,
      data: result,
    };
  }

  @Post('restore')
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  async restore(@Body() body: RestoreRegionDto, @Req() req) {
    const result = await this.regionService.restore(body.id);

    return {
      message: 'Restore a removed region',
      object: 'Region',
      url: req.url,
      data: result,
    };
  }
}
