import { Module } from '@nestjs/common';
import { SessionSerializer } from './session.serializer';

@Module({
  providers: [SessionSerializer],
  exports: [SessionSerializer],
})
export class SessionModule {}