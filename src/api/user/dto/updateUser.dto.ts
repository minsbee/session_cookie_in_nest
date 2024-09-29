import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInput {
  @ApiProperty({ required: false, description: '유저 이메일' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, description: '유저명' })
  @IsOptional()
  @IsString()
  name?: string;
}
