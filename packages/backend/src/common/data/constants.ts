import { IUsers } from "@common/interfaces";

export enum DBErrorCodes {
  Conflict = "23505",
}

export enum UserRole {
  Admin = "admin",
  Guest = "guest",
}

export const ROOT_USER: Partial<IUsers> = {
  email: "admin@backend.com",
  role: UserRole.Admin,
  firstName: "Montacer",
  lastName: "Dkhilali",
  password: "Pass@123",
};

export enum Environments {
  Development = "development",
  Production = "production",
  Staging = "staging",
}
