'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import kakaoLogo from '@/assets/images/kakaoLogin.png';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { usePostLogin } from '@/services/member/hooks/usePostLogin';
import { MemberLoginDto } from '@/services/member/types';

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function SignIn() {
  const { mutate: postLogin, isSuccess: isLoginSuccess } = usePostLogin();

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  // TODO: 운영 시 defaultValues 롤백
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'test@test',
      password: '1234',
    },
  });

  const onSubmit = (data: MemberLoginDto) => {
    try {
      postLogin({ email: data.email, password: data.password });
    } catch (error) {
      setErrorMessage('로그인 정보가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    if (!isLoginSuccess) return;
    router.push('/');
  }, [isLoginSuccess]);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle className="text-center">로그인</CardTitle>
          <CardDescription className="text-center">로그인 정보를 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input placeholder="아이디를 입력해 주세요." {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">이메일 형식으로 입력해 주세요.</FormDescription>
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
                    <FormDescription className="text-xs">
                      비밀번호는 특수문자와 숫자를 포함하여 총 8글자 이상입니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <div className="flex justify-center">
                <Button type="submit">로그인</Button>
              </div>
              {errorMessage && <div className="flex justify-center">{errorMessage}</div>}
              <div className="flex justify-center">
                <Image src={kakaoLogo} alt="카카오 로그인" />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end text-sm">
          계정이 없으신가요?&nbsp;
          <Link href="/signup" className="text-sm underline">
            회원가입하러 가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
