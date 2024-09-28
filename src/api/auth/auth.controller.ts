import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/session-auth.guard';
import { Request as ExpressRequest } from 'express'; // Import Request from express

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: ExpressRequest) { // Use the imported ExpressRequest type
    return req.user;
  }
}
