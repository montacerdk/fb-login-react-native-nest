import { Module } from "@nestjs/common";

import { SeederController } from "@modules/seeder/seeder.controller";
import { SeederService } from "@modules/seeder/seeder.service";
import { UserRepository } from "@repos/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
