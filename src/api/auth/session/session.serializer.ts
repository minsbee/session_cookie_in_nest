import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../../commons/prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error | null, userId: string) => void,
  ): any {
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: Error | null, user: User | null) => void,
  ) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
