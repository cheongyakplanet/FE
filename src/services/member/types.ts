export interface MemberLoginDto {
  email: string;
  password: string;
}

export interface MemberSignupDto {
  email: string;
  password: string;
  username: string;
}

export interface MyPageDto {
  email: string;
  username: string;
  interestLocal1: string;
  interestLocal2: string;
  interestLocal3: string;
  interestLocal4: string;
  interestLocal5: string;
  property: string | null;
  income: number;
  isMarried: boolean;
  numChild: number;
  numHouse: null;
  status: string;
}
