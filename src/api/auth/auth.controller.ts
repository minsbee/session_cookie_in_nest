import {
  Controller,
  Post,
  UseGuards,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/session-auth.guard';
import { Request as ExpressRequest } from 'express'; // Import Request from express

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: ExpressRequest) {
    return req.session.id;
  }

  @Post('/logout')
  async logout(@Request() req: ExpressRequest) {
    req.session.destroy((err) => {
      if (err) {
        throw new InternalServerErrorException('Failed to logout');
      }
    });
    return { message: 'Logged out successfully' };
  }
}
