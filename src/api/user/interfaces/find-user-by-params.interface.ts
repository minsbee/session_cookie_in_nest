import { FindUserByParamsInput } from '../dto/findUserByParams.dto';

export interface IUserServiceFindUserByParams {
  params: Partial<FindUserByParamsInput>;
}
