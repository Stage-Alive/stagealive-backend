import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserTypeService } from './usertype.service';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { StoreUserTypeDto } from './dto/store-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { RestoreUserTypeDto } from './dto/restore-user-type.dto';
import { IndexQueryDto } from '../dtos-global/index-query.dto';

@Controller('usertypes')
@ApiTags('usertypes')
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.userTypeService.paginate(query);

    return {
      message: 'Show a list of user types',
      object: 'User types',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get an user type' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.userTypeService.show(id);

    return {
      message: 'Get an user type',
      object: 'user type',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a user type' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StoreUserTypeDto, @Req() req) {
    const result = await this.userTypeService.store(body);

    return {
      message: 'Store a new user',
      object: 'user',
      url: req.url,
      data: result,
    };
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'Store a user type' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserTypeDto,
    @Req() req,
  ) {
    const result = await this.userTypeService.update(id, body);

    return {
      message: 'Update an user',
      object: 'user',
      url: req.url,
      data: result,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The user type was successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'User Type not found' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.userTypeService.destroy(id);

    return {
      message: 'Update an user type',
      object: 'user type',
      url: req.url,
      data: result,
    };
  }

  @Post('restore')
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  @ApiResponse({ status: 404, description: 'User type not found' })
  async restore(@Body() body: RestoreUserTypeDto, @Req() req) {
    const result = await this.userTypeService.restore(body.id);

    return {
      message: 'Restore a removed user',
      object: 'User',
      url: req.url,
      data: result,
    };
  }
}
