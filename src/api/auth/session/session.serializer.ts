import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { PrismaService } from '../../../commons/prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  serializeUser(user: User, done: (err: Error | null, user: any) => void): any {
    done(null, user.email);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, payload: any) => void,
  ): Promise<any> {
    const user = await this.prismaService.user.findUnique(payload);
    if (!user) {
      done(new Error('유저가 없습니다'), null);
      return;
    }
    const { password, ...userInfo } = user;
    done(null, userInfo);
  }
}
