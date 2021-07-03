import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({ example: "tester@test.com" })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: "123456" })
  @IsNotEmpty()
  public password: string;
}
