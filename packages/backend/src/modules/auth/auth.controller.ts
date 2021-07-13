import { ApiTags } from "@nestjs/swagger";
import {
  UseInterceptors,
  ValidationPipe,
  Controller,
  Body,
  Post,
} from "@nestjs/common";

import { SentryInterceptor } from "@common/sentry.interceptor";
import { AuthService } from "@modules/auth/auth.service";
import { UserEntity } from "@entities/user.entity";
import { IJwtToken } from "@common/interfaces";
import {
  ContinueWithFacebookDto,
  SignUpDto,
  SignInDto,
} from "@modules/auth/dto";

@Controller("/api/auth")
@ApiTags("Authentication")
@UseInterceptors(SentryInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signIn")
  public async signIn(
    @Body(ValidationPipe) params: SignInDto
  ): Promise<IJwtToken> {
    return this.authService.signIn(params);
  }

  @Post("/signUp")
  public async signUp(
    @Body(ValidationPipe) params: SignUpDto
  ): Promise<UserEntity> {
    return this.authService.signUp(params);
  }

  @Post("/continueWithFacebook")
  public async continueWithFacebook(
    @Body(ValidationPipe) params: ContinueWithFacebookDto
  ): Promise<IJwtToken> {
    return this.authService.continueWithFacebook(params);
  }
}
