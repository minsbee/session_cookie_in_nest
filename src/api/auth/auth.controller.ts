import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return { message: 'Logged in successfully', user: req.user };
  }

  @Get('logout')
  async logout(@Request() req) {
    req.logout();
    return { message: 'Logged out successfully' };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
