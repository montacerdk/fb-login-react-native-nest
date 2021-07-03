import { UseInterceptors, Controller, Get } from "@nestjs/common";
import { SentryInterceptor } from "@common/sentry.interceptor";
import { ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("Global")
@Controller("/")
@UseInterceptors(SentryInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): string {
    return this.appService.get();
  }
}
