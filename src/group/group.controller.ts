import {
  Controller,
  Request,
  Post,
  Put,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Get,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { AuthGuard } from '@nestjs/passport';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';

@Controller('groups')
@ApiTags('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.groupService.paginate(query);

    return {
      message: 'Show a list of groups',
      object: 'Group',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Request() request) {
    const result = await this.groupService.show(id);
    return {
      message: 'Subscribe user on group',
      object: 'group',
      url: request.url,
      data: result,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/subscribe')
  async subscribe(@Request() request, @Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.groupService.subscribe(request, id);
    return {
      message: 'Subscribe user on group',
      object: 'group',
      url: request.url,
      data: result,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/unsubscribe')
  async unsubscribe(@Request() request, @Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.groupService.unsubscribe(request, id);
    return {
      message: 'Unsubscribe user on group',
      object: 'group',
      url: request.url,
      data: result,
    };
  }
}
