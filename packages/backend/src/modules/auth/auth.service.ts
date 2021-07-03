import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { SignInDto } from "@modules/auth/dto/sign-in.dto";
import { SignUpDto } from "@modules/auth/dto/sign-up.dto";
import { UserRepository } from "@repos/users.repository";
import { UserEntity } from "@entities/user.entity";
import { IJwtToken } from "@common/interfaces";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
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
