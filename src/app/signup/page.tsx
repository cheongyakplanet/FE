'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import kakaoSignup from '@/assets/images/kakaoSignup.png';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { usePostLogin } from '@/services/member/hooks/usePostLogin';
import { usePostSignup } from '@/services/member/hooks/usePostSignup';
import { MemberSignupDto } from '@/services/member/types';

const formSchema = z.object({
  email: z.string().email({ message: '이메일이 올바르지 않아요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    .regex(/(?=.*[a-zA-Z])/, { message: '비밀번호에 영문자가 최소 1개 포함되어야 합니다.' })
    .regex(/(?=.*\d)/, { message: '비밀번호에 숫자가 최소 1개 포함되어야 합니다.' })
    .regex(/(?=.*[@$!%*?&])/, { message: '비밀번호에 특수문자(@,$,!,%,*,?,&)가 최소 1개 포함되어야 합니다.' })
    .regex(/^[A-Za-z\d@$!%*?&]+$/, { message: '비밀번호에 허용되지 않은 문자가 포함되어 있습니다.' }),
  username: z.string(),
});

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { mutate: postLogin, isSuccess: isLoginSuccess } = usePostLogin();
  const { mutate: postSignup, isSuccess: isSignupSuccess } = usePostSignup();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmit = async (data: MemberSignupDto) => {
    try {
      postSignup(data);
    } catch (error) {
      setErrorMessage('회원가입 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (!isSignupSuccess) return;

    postLogin({ email: form.getValues('email'), password: form.getValues('password') });
  }, [isSignupSuccess]);

  useEffect(() => {
    if (!isLoginSuccess) return;
    router.push('/');
  }, [isLoginSuccess]);

  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>회원가입을 위한 정보를 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="별명을 입력해 주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일을 입력해 주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input placeholder="비밀번호를 입력해 주세요." {...field} />
                    </FormControl>
                    <FormDescription>
                      비밀번호는 영문자, 특수문자, 숫자를 포함하여 총 8글자 이상이어야 합니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="flex justify-center">
                <Button type="submit">회원가입하기</Button>
              </div>
              <div className="flex justify-center">
                <Image src={kakaoSignup} alt="카카오 회원가입" />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
