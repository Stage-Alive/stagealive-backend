import { Controller, Request, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthFacebookDto } from './dtos/auth-facebook.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @Post('/facebook')
  async loginFacebook(@Body() body: AuthFacebookDto) {
    return this.authService.loginFacebook(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async me(@Request() request) {
    return this.authService.me(request);
  }
}
