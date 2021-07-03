import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as helmet from "helmet";

import { AppModule } from "./app.module";
import {
  QueryExceptionsFilters,
  HttpExceptionFilter,
} from "@common/exception-filters";

(async () => {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });
  const config = app.get(ConfigService);
  const swaggerOptions = new DocumentBuilder()
    .setTitle("Nest.js BP Backend Application")
    .setDescription("BP Backend starter project")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new QueryExceptionsFilters());
  app.use(helmet());
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("api/swagger", app, document);
  await app.listen(config.get("BACKEND_PORT"));
})();
