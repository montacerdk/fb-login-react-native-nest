import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { SeederModule } from "@modules/seeder/seeder.module";
import { AuthModule } from "@modules/auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          subscribers: [__dirname + "/../**/*.subscriber.js"],
          password: config.get("DB_PASSWORD"),
          entities: ["dist/**/*.entity.js"],
          database: config.get("DB_NAME"),
          username: config.get("DB_USER"),
          port: config.get("DB_PORT"),
          host: config.get("DB_HOST"),
          synchronize: true,
          dropSchema: false,
          type: "postgres",
        } as TypeOrmModuleOptions;
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SeederModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
