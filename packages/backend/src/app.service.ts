import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  get(): string {
    const html =
      '<html><head></head><body style="text-align: center; margin-top: 350px">' +
      "<h1>Hello from BP Backend Application.</h1></body></html>";
    return html;
  }
}
