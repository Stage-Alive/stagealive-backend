import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RestoreUserDto } from './dto/restore-user.dto';
import { StoreUserDto } from './dto/store-user.dto';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.userService.paginate(query);

    return {
      message: 'Show a list of users',
      object: 'User',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get an user' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.userService.show(id);

    return {
      message: 'Get an user',
      object: 'user',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a user' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StoreUserDto, @Req() req) {
    const result = await this.userService.store(body);

    return {
      message: 'Store a new user',
      object: 'user',
      url: req.url,
      data: result,
    };
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'Store a user' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
    @Req() req,
  ) {
    const result = await this.userService.update(id, body);

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
    description: 'The user was successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.userService.destroy(id);

    return {
      message: 'Update an user',
      object: 'user',
      url: req.url,
      data: result,
    };
  }

  @Post('restore')
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async restore(@Body() body: RestoreUserDto, @Req() req) {
    const result = await this.userService.restore(body.id);

    return {
      message: 'Restore a removed user',
      object: 'User',
      url: req.url,
      data: result,
    };
  }
}
