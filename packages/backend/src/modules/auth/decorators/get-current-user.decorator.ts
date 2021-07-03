import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { UserEntity } from "@entities/user.entity";

export const GetCurrentUser = createParamDecorator(
  (_, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
);
