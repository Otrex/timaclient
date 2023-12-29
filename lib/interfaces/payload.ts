import type { UserType } from "../enums";

export interface CreateUser {
  username: string;
  password: string;
  email: string;
  userType: UserType;
}
