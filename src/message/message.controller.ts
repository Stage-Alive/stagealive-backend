import {
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
  Controller,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';
import { MessageService } from './message.service';
import { StoreMessageDto } from './dtos/store-message.dto';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.messageService.paginate(query);

    return {
      message: 'Show a list of messages',
      object: 'messages',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get a message' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.messageService.show(id);

    return {
      message: 'Get a message',
      object: 'message',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a message' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StoreMessageDto, @Req() req) {
    const result = await this.messageService.store(body);

    return {
      message: 'Store a message',
      object: 'message',
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
    const result = await this.messageService.destroy(id);

    return {
      message: 'Deleting a message',
      object: 'message',
      url: req.url,
      data: result,
    };
  }
}
