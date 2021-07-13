import { Column, Entity, Unique } from "typeorm";
import * as bcrypt from "bcrypt";

import { Base } from "@entities/base";

// TODO: Resolve Import issue from constants.
enum UserRole {
  Admin = "admin",
  Guest = "guest",
}

@Entity({
  name: "users",
})
@Unique("UK_USER_EMAIL", ["email"])
export class UserEntity extends Base {
  @Column({ name: "email" }) email: string;

  @Column({ name: "first_name" }) firstName: string;

  @Column({ name: "last_name" }) lastName: string;

  @Column({ name: "role", type: "enum", enum: UserRole })
  public role: UserRole;

  @Column({ name: "fb_provider_id", nullable: true, unique: true })
  public fbProviderId: string;

  @Column({ select: false })
  password?: string;

  @Column({ select: false })
  salt?: string;

  constructor(user?: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }

  public async validatePassword(
    pwd: string,
    salt: string,
    hashPwd: string
  ): Promise<boolean> {
    const hash = await bcrypt.hash(pwd, salt);
    return hash === hashPwd;
  }
}
