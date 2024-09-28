import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../commons/prisma/prisma.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('해당하는 유저를 찾을 수 없습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('패스워드가 일치하지 않습니다.');
    }

    return user;
  }
}
