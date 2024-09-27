import { IsOptional, IsString } from 'class-validator';

export class UpdateUserInput {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
