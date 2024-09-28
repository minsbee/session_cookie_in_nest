import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FindUserByParamsInput } from './dto/findUserByParams.dto';
import { UserOmitPassword } from './types/user-types';
import { UpdateUserInput } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/find')
  async findUserByParams(
    params: FindUserByParamsInput,
  ): Promise<UserOmitPassword> {
    return await this.userService.findUserByParams({ params });
  }

  @Patch('/update/:id')
  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(id, { updateUserInput });
  }

  @Delete('/delete/:id')
  async deleteUser(id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
