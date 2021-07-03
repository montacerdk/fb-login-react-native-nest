import { UserEntity } from "@entities/user.entity";
import { UserRole } from "@common/data/constants";

export interface IJwtStrategyPayload {
  exp: number;
  id: number;
}

export interface IJwtToken {
  accessToken: string;
}

export interface IUsers {
  firstName: string;
  password?: string;
  lastName: string;
  role: UserRole;
  salt?: string;
  email: string;
  id: number;
}

export interface ISeeds {
  rootUser: UserEntity;
}
