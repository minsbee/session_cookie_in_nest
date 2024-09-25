import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  prisma: PrismaClient;

  constructor() {
    // 이미 생성된 PrismaClient 인스턴스를 상속받도록 되어 있으므로 super()를 호출하여 Prismaclient를 초기화합니다.
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
