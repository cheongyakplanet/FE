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

export interface MyPageDto {
  email: string;
  username: string;
  interestLocals: string[];
  // interestLocal1: string;
  // interestLocal2: string;
  // interestLocal3: string;
  // interestLocal4: string;
  // interestLocal5: string;
  property: number | null;
  income: number | null;
  isMarried: boolean | null;
  numChild: number | null;
  numHouse: number | null;
  status: string;
}

export interface MyPostDto {
  id: string;
  title: string;
  content: string;
  username: string;
  views: string;
  likes: string;
  createdAt: string;
}

export interface MyInfoDto {
  email: string;
  username: string;
  property: string;
  income: string;
  isMarried: boolean;
  numChild: number;
  numHouse: number;
}
