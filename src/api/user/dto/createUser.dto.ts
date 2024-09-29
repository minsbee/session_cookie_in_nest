import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserInput {
  @ApiProperty({ description: '유저명' })
  @IsString()
  name: string;

  @ApiProperty({ description: '유저 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '유저 비밀번호' })
  @IsString()
  password: string;
}