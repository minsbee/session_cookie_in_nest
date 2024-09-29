import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../commons/prisma/prisma.service';
import { User } from './user.entity';
import { UserOmitPassword } from './types/user-types';
import { IUserServiceFindUserByParams } from './interfaces/find-user-by-params.interface';
import { IUserServiceUpdate } from './interfaces/update-user.interface';
import { IUserServiceCreate } from './interfaces/create-user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser({ createUserInput }: IUserServiceCreate): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: createUserInput.email },
    });

    if (user) {
      throw new InternalServerErrorException('유저가 이미 존재합니다.');
    }

    try {
      const salt = await bcrypt.genSalt(10);

      return await this.prismaService.user.create({
        data: {
          ...createUserInput,
          password: await bcrypt.hash(createUserInput.password, salt),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('유저 생성에 실패하였습니다.');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const result = await this.prismaService.user.findMany(
        { where: { deletedAt: null } },
      );
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
      const user = await this.prismaService.user.findFirstOrThrow({
        where: {
          id: params.id,
          email: params.email,
          name: params.name,
          deletedAt: null,
        },
      });

      if(!user) throw new NotFoundException('유저가 존재하지 않습니다.');

      const {password, ...result} = user;
      return result;
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
    {updateUserInput}: IUserServiceUpdate,
  ): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('유저를 찾을 수 없습니다.');
      } else if (user.deletedAt !== null) {
        throw new ConflictException('삭제된 유저입니다.');
      }

      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...updateUserInput.email ? { email: updateUserInput.email } : {},
          ...updateUserInput.name ? { name: updateUserInput.name } : {},
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('유저 수정에 실패하였습니다.');
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('유저를 찾을 수 없습니다.');
      } else if (user.deletedAt !== null) {
        throw new ConflictException('삭제된 유저입니다.');
      }

      return await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('유저 삭제에 실패하였습니다.');
    }
  }
}
