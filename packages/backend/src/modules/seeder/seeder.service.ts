import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

import { UserRepository } from "@repos/users.repository";
import { UserEntity } from "@entities/user.entity";
import { ROOT_USER, ISeeds } from "@common/index";

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async seed(): Promise<ISeeds> {
    try {
      const rootUser = await this.seedRootUser();
      return { rootUser };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async seedRootUser(): Promise<UserEntity> {
    let rootUser = await this.userRepository.findOne({
      email: ROOT_USER.email,
    });
    if (!rootUser) {
      const salt = await this.userRepository.generateSalt();
      const password = await this.userRepository.hashPassword(
        ROOT_USER.password,
        salt
      );
      rootUser = await this.userRepository.save(
        new UserEntity({
          ...ROOT_USER,
          salt,
          password: password,
        })
      );
    }
    delete rootUser.salt;
    delete rootUser.password;
    return rootUser;
  }
}
