export interface MemberLoginDto {
  email: string;
  password: string;
}

export interface MemberSignupDto {
  email: string;
  password: string;
  username: string;
}

export interface FindPwDto {
  pwEmail: string;
  name: string;
}

export interface ChangePwDto {
  pwEmail: string;
  name: string;
  validCode: string;
  newPw: string;
}
