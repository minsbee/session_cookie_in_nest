import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserByParamsInput {
  @ApiProperty({ required: false, description: '유저 ID' })
  @IsOptional() // 값이 없어도 유효성 검사 통과
  @IsString() // 값이 있다면 문자열이어야 함
  id?: string;

  @ApiProperty({ required: false, description: '유저 이메일' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, description: '유저명' })
  @IsOptional()
  @IsString()
  name?: string;
}
