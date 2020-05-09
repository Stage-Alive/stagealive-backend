import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexQueryDto } from 'src/dtos-global/index-query.dto';
import { ContactFormService } from './contactform.service';
import { StoreContactFormDto } from './dtos/store-contactform.dto';

@Controller('contactforms')
@ApiTags('contactforms')
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) {}

  @Get()
  async index(@Req() req, @Query() query?: IndexQueryDto) {
    const result = await this.contactFormService.paginate(query);

    return {
      message: 'Show a list of contact forms',
      object: 'Contact Form',
      url: req.url,
      data: result,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get a contact form' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    const result = await this.contactFormService.show(id);

    return {
      message: 'Get a contact form',
      object: 'Contact Form',
      url: req.url,
      data: result,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Store a region' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  async store(@Body() body: StoreContactFormDto, @Req() req) {
    const result = await this.contactFormService.store(body);

    return {
      message: 'Store a region',
      object: 'region',
      url: req.url,
      data: result,
    };
  }
}
