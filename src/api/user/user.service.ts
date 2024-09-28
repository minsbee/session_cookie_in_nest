import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../commons/prisma/prisma.service';
import { User } from './user.entity';
import { UserOmitPassword } from './types/user-types';
import { IUserServiceFindUserByParams } from './interfaces/find-user-by-params.interface';
import { IUserServiceUpdate } from './interfaces/update-user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    try {
      const result = await this.prismaService.user.findMany();
      if (!result) throw new NotFoundException('유저목록이 존재하지 않습니다.');
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        '전체 유저 조회에 실패하였습니다.',
      );
    }
  }

  async findUserByParams({
    params,
  }: IUserServiceFindUserByParams): Promise<UserOmitPassword> {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: {
          id: params.id,
          email: params.email,
          name: params.name,
        },
      });
    } catch (error) {
      // `findFirstOrThrow` 자체가 NotFoundException을 던짐
      throw new InternalServerErrorException(
        '유저 조회에 실패하였습니다.',
        error.message,
      );
    }
  }

  async updateUser(
    id: string,
    updateUserInput: IUserServiceUpdate,
  ): Promise<User> {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { ...updateUserInput },
      });
    } catch (error) {
      throw new InternalServerErrorException('유저 수정에 실패하였습니다.');
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      return await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('유저 삭제에 실패하였습니다.');
    }
  }
}
