'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Lock, LogIn, Mail } from 'lucide-react';
import { z } from 'zod';

import kakaoLogo from '@/assets/images/kakao_symbol.svg';

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
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-10">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <LogIn className="h-6 w-6 text-blue-500" />
            로그인
          </CardTitle>
          <CardDescription className="text-center">로그인 정보를 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-gray-500" />
                      아이디
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="아이디를 입력해 주세요." className="pl-10" {...field} />
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
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
                    <FormLabel className="flex items-center gap-1">
                      <Lock className="h-4 w-4 text-gray-500" />
                      비밀번호
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="password" placeholder="비밀번호를 입력해 주세요." className="pl-10" {...field} />
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      비밀번호는 특수문자와 숫자를 포함하여 총 8글자 이상입니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {errorMessage && (
                <div className="flex items-center justify-center gap-1 rounded-md bg-red-50 p-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  로그인
                </Button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 flex-shrink text-sm text-gray-400">또는</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  className="bg-kakao flex w-full items-center justify-center gap-8 hover:bg-yellow-300"
                >
                  <Image src={kakaoLogo} alt="카카오 로그인" width={24} height={24} />
                  <span>카카오 로그인</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center gap-1 border-t border-gray-100 pt-4 text-sm">
          계정이 없으신가요?&nbsp;
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            회원가입하러 가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
