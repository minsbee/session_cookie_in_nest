import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FindUserByParamsInput } from './dto/findUserByParams.dto';
import { UserOmitPassword } from './types/user-types';
import { UpdateUserInput } from './dto/updateUser.dto';
import { CreateUserInput } from './dto/createUser.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: CreateUserInput })
  @Post('/create')
  async createUser(@Body()createUserInput: CreateUserInput): Promise<User> {
    return await this.userService.createUser({ createUserInput });
  }

  @ApiOperation({ summary: '모든 유저 조회' })
  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: '유저 조회' })
  @ApiBody({ type: FindUserByParamsInput })
  @Post('/find')
  async findUserByParams(
    @Body()params: FindUserByParamsInput,
  ): Promise<UserOmitPassword> {
    return await this.userService.findUserByParams({ params });
  }

  @ApiOperation({ summary: '유저 업데이트' })
  @ApiParam({ name: 'id', description: '유저 ID' })
  @ApiBody({ required: false, type: UpdateUserInput })
  @Patch('/:id')
  async updateUser(
    @Param('id')id: string,
    @Body()updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(id, { updateUserInput });
  }

  @ApiOperation({ summary: '유저 삭제' })
  @ApiParam({ name: 'id', description: '유저 ID' })
  @Delete('/delete/:id')
  async deleteUser(@Param('id')id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
