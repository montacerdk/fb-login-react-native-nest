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
    return user;
  }

  public async signUp(user: Partial<UserEntity>): Promise<UserEntity> {
    const check = await this.findOne({ email: user.email });
    if (check) {
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
