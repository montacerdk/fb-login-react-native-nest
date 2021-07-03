import { Controller, Get, HttpStatus, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { SentryInterceptor } from "@common/sentry.interceptor";
import { SeederService } from "@modules/seeder/seeder.service";
import { ISeeds } from "@common/interfaces";

@ApiTags("Seeder")
@Controller("/api/seeder")
@UseInterceptors(SentryInterceptor)
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get("/")
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Seed database with initial data and return them.",
  })
  public async seed(): Promise<ISeeds> {
    return this.seederService.seed();
  }
}
