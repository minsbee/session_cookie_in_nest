import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  InternalServerErrorException,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/session-auth.guard';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express'; // Import Request from express

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ) {
    return res.status(200).send(`로그인 성공!, 세션 id: ${req.session.id}`);
  }

  @Post('/logout')
  async logout(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ) {
    req.session.destroy((err) => {
      if (err) {
        throw new InternalServerErrorException('로그아웃 오류 발생!');
      }

      res.clearCookie('connect.sid');
      return res.status(200).send('로그아웃 성공');
    });
  }
}
