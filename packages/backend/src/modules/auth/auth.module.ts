import { PassportModule } from "@nestjs/passport";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { JwtStrategy } from "@modules/auth/strategy/jwt.strategy";
import { AuthController } from "@modules/auth/auth.controller";
import { UserRepository } from "@repos/users.repository";
import { AuthService } from "@modules/auth/auth.service";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),
        signOptions: {
          expiresIn: config.get("JWT_EXPIRES_IN"),
        },
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.registerAsync({
      inject: [ConfigService],
      useFactory: async () => {
        return {
          defaultStrategy: "jwt",
        };
      },
    }),
  ],
  exports: [AuthService, PassportModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
