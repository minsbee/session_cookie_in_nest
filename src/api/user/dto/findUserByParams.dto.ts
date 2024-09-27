import { IsOptional, IsString } from 'class-validator';

export class FindUserByParamsInput {
  @IsOptional() // 값이 없어도 유효성 검사 통과
  @IsString() // 값이 있다면 문자열이어야 함
  id?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
