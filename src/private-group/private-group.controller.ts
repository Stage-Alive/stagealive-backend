import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, Req, Put, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';
import { RestorePrivateGroupDto } from './dtos/restore-private-group.dto';
import { StorePrivateGroupDto } from './dtos/store-private-group.dto';
import { PrivateGroupService } from './private-group.service';
import { UpdatePrivateGroupDto } from './dtos/update-private-group.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('privategroups')
@ApiTags('privategroups')
@UseGuards(AuthGuard('jwt'))
export class PrivateGroupController {
  constructor(private readonly privateGroupService: PrivateGroupService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.privateGroupService.paginate(query);

    return {
      message: 'Show a list of private group',
      object: 'private group',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get a private group' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.privateGroupService.show(id);

    return {
      message: 'Get a private group',
      object: 'Private Group',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a private group' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StorePrivateGroupDto, @Req() req) {
    const userId: string = req.user.id;
    const result = await this.privateGroupService.store(body, userId);

    return {
      message: 'Store a private group',
      object: 'Private Group',
      url: req.url,
      data: result,
    };
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'Update a private group' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdatePrivateGroupDto, @Req() req) {
    const result = await this.privateGroupService.update(id, body);

    return {
      message: 'Update a private group',
      object: 'Private Group',
      url: req.url,
      data: result,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The private was successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Region not found' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.privateGroupService.destroy(id);

    return {
      message: 'Deleting a private group',
      object: 'Private Group',
      url: req.url,
      data: result,
    };
  }

  @Post('restore')
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  @ApiResponse({ status: 404, description: 'private not found' })
  async restore(@Body() body: RestorePrivateGroupDto, @Req() req) {
    const result = await this.privateGroupService.restore(body.id);

    return {
      message: 'Restore a removed private group',
      object: 'private group',
      url: req.url,
      data: result,
    };
  }
}
