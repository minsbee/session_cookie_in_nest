import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../commons/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/session-local.strategy';
import { SessionSerializer } from './session/session.serializer';
import { RedisModule } from '../../commons/redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    UserModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
