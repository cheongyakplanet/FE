'use client';

/**
 * Enhanced Login Page with Improved Error Handling
 * 
 * Features:
 * - Displays backend error messages from API responses
 * - Maps error codes (e.g., SIGN004) to user-friendly Korean messages
 * - Shows loading state during login attempts
 * - Clears error messages when user starts typing
 * - Includes i18n support for future internationalization
 * - Uses reusable ErrorAlert component for consistent styling
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Lock, LogIn, Mail, AlertTriangle } from 'lucide-react';
import { z } from 'zod';

import kakaoLogo from '@/assets/images/kakao_symbol.svg';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorAlert } from '@/components/ui/error-alert';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { extractErrorInfo, getErrorMessage } from '@/lib/error-messages';

import { usePostLogin } from '@/services/member/hooks/usePostLogin';
import { MemberLoginDto } from '@/services/member/types';

const KAKAO_LOGIN_URL = `${process.env.NEXT_PUBLIC_OAUTH_KAKAO_API_URL}?client_id=${process.env.NEXT_PUBLIC_OAUTH_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_KAKAO_REDIRECT_URL}&response_type=code&prompt=login`;

const formSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자리 이상이어야 합니다'),
});

export default function SignIn() {
  const { mutate: postLogin, isSuccess: isLoginSuccess, isPending, error } = usePostLogin();

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: MemberLoginDto) => {
    // Clear any existing error message
    setErrorMessage('');
    
    postLogin(
      { email: data.email, password: data.password },
      {
        onError: (error: any) => {
          const errorInfo = extractErrorInfo(error);
          
          let friendlyMessage;
          if (errorInfo.code || errorInfo.message || errorInfo.details) {
            friendlyMessage = getErrorMessage(
              errorInfo.code,
              errorInfo.message || errorInfo.details,
              '로그인 정보가 일치하지 않습니다.'
            );
          } else {
            // Fallback if extraction fails
            friendlyMessage = '로그인 정보가 일치하지 않습니다. 이메일과 비밀번호를 확인해주세요.';
          }
          
          setErrorMessage(friendlyMessage);
        }
      }
    );
  };

  // Clear error message when user starts typing
  const clearErrorOnChange = () => {
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const kakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  useEffect(() => {
    if (!isLoginSuccess) return;
    router.push('/');
  }, [isLoginSuccess]);

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-6 sm:py-10">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="pb-2 px-4 sm:px-6">
          <CardTitle className="flex items-center justify-center gap-2 text-xl sm:text-2xl">
            <LogIn className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            로그인
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">로그인 정보를 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1 text-sm sm:text-base">
                      <Mail className="h-4 w-4 text-gray-500" />
                      아이디
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="example@example.com" 
                          className="pl-10 text-sm sm:text-base" 
                          autoComplete="username"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            clearErrorOnChange();
                          }}
                        />
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
                    <FormLabel className="flex items-center gap-1 text-sm sm:text-base">
                      <Lock className="h-4 w-4 text-gray-500" />
                      비밀번호
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type="password" 
                          placeholder="8자리 이상" 
                          className="pl-10 text-sm sm:text-base" 
                          autoComplete="current-password"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            clearErrorOnChange();
                          }}
                        />
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
                <ErrorAlert
                  title="로그인 실패"
                  message={errorMessage}
                  onDismiss={() => setErrorMessage('')}
                  variant="error"
                />
              )}

              <div className="flex flex-col space-y-3">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-sm sm:text-base py-2 sm:py-3"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      로그인 중...
                    </div>
                  ) : (
                    '로그인'
                  )}
                </Button>
                <Link href="/find-auth" className="flex w-full justify-center text-xs sm:text-sm text-gray-500 hover:underline">
                  아이디/비밀번호 찾기
                </Link>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 flex-shrink text-xs sm:text-sm text-gray-400">또는</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  className="flex w-full items-center justify-center gap-2 sm:gap-4 bg-kakao hover:bg-yellow-300 text-sm sm:text-base py-2 sm:py-3"
                  onClick={kakaoLogin}
                >
                  <Image src={kakaoLogo} alt="카카오 로그인" width={20} height={20} className="sm:w-6 sm:h-6" />
                  <span>카카오 로그인</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-1 border-t border-gray-100 pt-4 text-xs sm:text-sm px-4 sm:px-6">
          <span>계정이 없으신가요?</span>
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            회원가입하러 가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
