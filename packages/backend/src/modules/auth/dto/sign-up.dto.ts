import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty({ example: "tester@test.com" })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: "Super" })
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({ example: "Developer" })
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({ example: "123456" })
  @IsNotEmpty()
  public password: string;
}
