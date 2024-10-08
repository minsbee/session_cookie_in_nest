import { Module } from '@nestjs/common';
import { PrismaModule } from './commons/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { RedisModule } from './commons/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RedisModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
