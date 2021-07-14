import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";

import { UserRepository } from "@repos/users.repository";
import { UserEntity } from "@entities/user.entity";
import { IJwtToken } from "@common/interfaces";
import {
  ContinueWithFacebookDto,
  SignInDto,
  SignUpDto,
} from "@modules/auth/dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async signIn(params: SignInDto): Promise<IJwtToken> {
    const user = await this.getUserRepository().signIn(params);
    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  public async signUp(params: SignUpDto): Promise<UserEntity> {
    return await this.getUserRepository().signUp(params);
  }

  public async continueWithFacebook(
    params: ContinueWithFacebookDto
  ): Promise<IJwtToken> {
    const facebookData = await axios.get(
      `${this.configService.get("FACEBOOK_ME_URL")}?access_token=${
        params.accessToken
      }`
    );
    const providerId = facebookData.data.id;
    if (params.id !== providerId) {
      throw new UnauthorizedException("Invalid user id");
    } else {
      let user = await this.userRepository
        .createQueryBuilder("user")
        .where("user.email = :email", { email: params.email })
        .andWhere("user.fbProviderId = :providerId", { providerId })
        .getOne();
      if (!user) {
        user = await this.getUserRepository().signUp({
          firstName: params.firstName,
          lastName: params.lastName,
          fbProviderId: providerId,
          email: params.email,
        });
      }
      const accessToken = this.jwtService.sign({ id: user.id });
      return { accessToken };
    }
  }

  public findUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }

  public getJwtService(): JwtService {
    return this.jwtService;
  }
}
