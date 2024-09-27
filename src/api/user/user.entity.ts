import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: '유저의 고유 식별자',
    example: '807d2595-a4a9-493e-abfd-92b43e195207',
  })
  id: string;

  @ApiProperty({
    description: '유저의 이름',
    example: 'minsu',
  })
  name: string;
  @ApiProperty({
    description: '유저의 이메일',
    example: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: '유저의 비밀번호',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: '유저의 생성일',
    example: '2021-10-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '유저의 정보 업데이트일',
    example: '2021-10-01T00:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '유저의 삭제일',
    example: '2021-10-01T00:00:00Z',
    required: false,
  })
  deletedAt: Date | null;

  // @ApiProperty({
  //   description: '유저의 세션 정보',
  //   example: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MDdkMjU5NS1hNGE5LTQ5M2UtYWJmZC05MmI0M2UxOTUyMDciLCJpYXQiOjE2MzQwNjYwNzMsImV4cCI6MTYzNDA2NjA3M30.1J9Z6J9']
  //   required: false,
  // })
  // Sessions: Session[]
}
