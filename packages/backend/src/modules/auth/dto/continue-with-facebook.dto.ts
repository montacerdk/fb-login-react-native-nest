import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ContinueWithFacebookDto {
  @ApiProperty()
  @IsNotEmpty()
  public id: string;

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

  @ApiProperty()
  @IsNotEmpty()
  public accessToken: string;
}
