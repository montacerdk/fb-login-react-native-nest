import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import {
  UnauthorizedException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";

import { IJwtStrategyPayload } from "@common/interfaces";
import { AuthService } from "@modules/auth/auth.service";
import { UserEntity } from "@entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  public async validate(payload: IJwtStrategyPayload): Promise<UserEntity> {
    const user = await this.authService.findUser(payload.id);
    if (!user) {
      throw new NotFoundException(`User with id ${payload.id} is not found.`);
    }
    if (Date.now() > payload.exp * 1000) {
      throw new UnauthorizedException("Session expired.");
    }
    return user;
  }
}
