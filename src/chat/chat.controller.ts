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
import { ChatService } from './chat.service';
import { StoreChatDto } from './dtos/store-chat.dto';

@Controller('chats')
@ApiTags('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.chatService.paginate(query);

    return {
      message: 'Show a list of chats',
      object: 'chats',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get a chat' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.chatService.show(id);

    return {
      message: 'Get a chat',
      object: 'chat',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a chat' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StoreChatDto, @Req() req) {
    const result = await this.chatService.store(body);

    return {
      message: 'Store a chat',
      object: 'chat',
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
    const result = await this.chatService.destroy(id);

    return {
      message: 'Deleting a chat',
      object: 'chat',
      url: req.url,
      data: result,
    };
  }
}
