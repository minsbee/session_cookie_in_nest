import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../commons/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
  private readonly userService: UserService,
  ) {}

}
