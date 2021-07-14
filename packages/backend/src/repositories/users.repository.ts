import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";

import { SignInDto } from "@modules/auth/dto/sign-in.dto";
import { UserEntity } from "@entities/user.entity";
import { UserRole } from "@common/data";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  constructor() {
    super();
  }

  public async signIn({ email, password }: SignInDto): Promise<UserEntity> {
    const user = await this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .select([
        "user.fbProviderId",
        "user.firstName",
        "user.lastName",
        "user.password",
        "user.email",
        "user.salt",
        "user.role",
        "user.salt",
        "user.id",
      ])
      .getOne();
    if (!user) {
      throw new NotFoundException(`User with this email ${email} not found`);
    }
    const checkCredentials = await user.validatePassword(
      password,
      user.salt,
      user.password
    );
    if (!checkCredentials) {
      throw new BadRequestException("Bad Credentials.");
    }
    delete user.salt;
    delete user.password;
    return user;
  }

  public async signUp(user: Partial<UserEntity>): Promise<UserEntity> {
    const checkedUser = await this.createQueryBuilder("user")
      .where("user.email = :email", { email: user.email })
      .getOne();
    if (checkedUser) {
      throw new ConflictException("User already exist.");
    }
    if (!!user.password) {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(user.password, user.salt);
    }
    return await this.save({ ...user, role: UserRole.Admin });
  }

  public hashPassword(pwd: string, salt: string): Promise<string> {
    return bcrypt.hash(pwd, salt);
  }

  public async generateSalt(): Promise<string> {
    return bcrypt.genSaltSync(1);
  }
}
