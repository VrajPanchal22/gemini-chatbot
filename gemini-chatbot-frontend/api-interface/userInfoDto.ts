export interface UserInfoDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface TokenData {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  exp: number;
  iat: number;
}
