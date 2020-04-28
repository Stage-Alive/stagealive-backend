import { Body, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';
import { RestorePublicGroupDto } from './dtos/restore-public-group.dto';
import { StorePublicGroupDto } from './dtos/store-public-group.dto';
import { UpdatePublicGroupDto } from './dtos/update-public-group.dto';
import { PublicGroupService } from './public-group.service';

export class PublicGroupController {
  constructor(private readonly publicGroupService: PublicGroupService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.publicGroupService.paginate(query);

    return {
      message: 'Show a list of region',
      object: 'Region',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get a public group' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.publicGroupService.show(id);

    return {
      message: 'Get a public group',
      object: 'Public Group',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a public group' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StorePublicGroupDto, @Req() req) {
    const result = await this.publicGroupService.store(body);

    return {
      message: 'Store a public group',
      object: 'Public Group',
      url: req.url,
      data: result,
    };
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'Update a public group' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePublicGroupDto,
    @Req() req,
  ) {
    const result = await this.publicGroupService.update(id, body);

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
    description: 'The public was successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Region not found' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.publicGroupService.destroy(id);

    return {
      message: 'Deleting a public group',
      object: 'Public Group',
      url: req.url,
      data: result,
    };
  }

  @Post('restore')
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  async restore(@Body() body: RestorePublicGroupDto, @Req() req) {
    const result = await this.publicGroupService.restore(body.id);

    return {
      message: 'Restore a removed region',
      object: 'Region',
      url: req.url,
      data: result,
    };
  }
}
