'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { usePostChangePw } from '@/services/member/hooks/usePostChangePw';
import { usePostFindId } from '@/services/member/hooks/usePostFindId';
import { usePostFindPw } from '@/services/member/hooks/usePostFindPw';
import { usePostLogin } from '@/services/member/hooks/usePostLogin';
import { ChangePwDto, FindPwDto } from '@/services/member/types';

export default function FindAuth() {
  const router = useRouter();

  const [IdEmail, setIdEmail] = useState('');
  const [validIdEmail, setValidIdEmail] = useState(false);
  const [message, setMessage] = useState('');

  const [pwEmail, setPwEmail] = useState('');
  const [validPwEmail, setValidPwEmail] = useState(false);

  const [name, setName] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const [validCode, setValidCode] = useState('');
  const [isCodeMatch, setIsCodeMatch] = useState(false);

  const [newPw, setNewPw] = useState('');
  const [checkNewPw, setCheckNewPw] = useState('');

  const { mutate: postFindId } = usePostFindId();
  const { mutate: postFindPw, data: findPwData } = usePostFindPw();
  const { mutate: postChangePw } = usePostChangePw();
  const { mutate: login } = usePostLogin();

  const checkIdEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdEmail(value);
    setValidIdEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const checkPwEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwEmail(value);
    setValidPwEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const findEmail = (email: string) => {
    postFindId(email, {
      onSuccess: (data) => {
        if (data == 'success') {
          setMessage('가입 이력이 있는 이메일이에요. 로그인해보세요!');
        } else {
          setMessage('해당 이메일로 가입된 계정을 찾을 수 없어요.');
        }
      },
    });
  };

  const sendCode = ({ pwEmail, name }: FindPwDto) => {
    postFindPw({ pwEmail, name });
    setShowCodeInput(true);
  };

  const checkCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValidCode(value);

    if (findPwData?.verificationCode && value == findPwData.verificationCode) {
      setIsCodeMatch(true);
    } else {
      setIsCodeMatch(false);
    }
  };

  const changePw = async ({ pwEmail, name, validCode, newPw }: ChangePwDto) => {
    try {
      await postChangePw({ pwEmail, name, validCode, newPw });
      await login({ email: pwEmail, password: newPw });
      router.push('/');
    } catch (error) {
      console.error('비밀번호 변경 또는 로그인 실패', error);
    }
  };

  return (
    <Tabs defaultValue="find-id">
      <div className="mb-3 flex justify-center text-lg font-semibold">
        청약 준비, 다시 시작해볼까요? <br />
        청약플래닛이 여러분의 계정 찾기를 도와드립니다.
      </div>
      <div className="flex justify-center">
        <div className="w-2/5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find-id">아이디 찾기</TabsTrigger>
            <TabsTrigger value="find-password">비밀번호 찾기</TabsTrigger>
          </TabsList>

          <TabsContent value="find-id">
            <Card>
              <CardHeader>
                <CardTitle>아이디 찾기</CardTitle>
                <CardDescription>
                  <div className="font-semibold">우리 청약플래닛에서는 이메일을 아이디로 사용합니다.</div>
                  <div className="text-xs">입력하신 이메일로 가입된 계정이 있는지 확인해 드릴게요.</div>
                  <div className="text-xs text-gray-400">
                    가입 여부만 확인되며, 아이디(이메일)는 별도로 제공되지 않습니다.
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                아이디
                <Input value={IdEmail} onChange={checkIdEmail} placeholder="이메일을 입력해 주세요." />
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button onClick={() => findEmail(IdEmail)} disabled={!validIdEmail} className="items-center">
                  아이디 찾기
                </Button>
                <div className="mt-2">{message}</div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="find-password">
            <Card>
              <CardHeader>
                <CardTitle>비밀번호 찾기</CardTitle>
                <CardDescription>이메일 인증번호 확인 후 비밀번호를 재설정 해주세요.</CardDescription>
              </CardHeader>
              <CardContent>
                아이디
                <Input value={pwEmail} onChange={checkPwEmail} placeholder="이메일을 입력해 주세요." />
              </CardContent>
              <CardContent>
                이름
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임을 입력해 주세요." />
              </CardContent>
              {!showCodeInput && (
                <CardContent className="flex flex-col">
                  <div className="mb-1 text-center text-xs">이메일로 인증번호가 전송됩니다.</div>
                  <Button onClick={() => sendCode({ pwEmail, name })} disabled={!name || !validPwEmail}>
                    인증번호 보내기
                  </Button>
                </CardContent>
              )}
              {showCodeInput && (
                <CardContent className="flex items-center">
                  <div className="w-2/5 text-sm">인증번호</div>
                  <Input
                    value={validCode}
                    onChange={checkCode}
                    className={`w-3/5 ${isCodeMatch ? 'border-green-600 ring-1 ring-green-600' : ''}`}
                  />
                </CardContent>
              )}

              {isCodeMatch && (
                <CardContent>
                  <div className="mb-3 flex items-center">
                    <div className="w-2/5 text-sm">새 비밀번호 입력</div>
                    <Input
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      className={`w-3/5 ${!newPw && !checkNewPw ? '' : newPw === checkNewPw ? 'border-green-600 ring-1 ring-green-600' : 'border-red-600 ring-1 ring-red-600'}`}
                    />
                  </div>
                  <div className="mb-5 flex items-center">
                    <div className="w-2/5 text-sm">새 비밀번호 확인</div>
                    <Input
                      value={checkNewPw}
                      onChange={(e) => setCheckNewPw(e.target.value)}
                      className={`w-3/5 ${!newPw && !checkNewPw ? '' : newPw === checkNewPw ? 'border-green-600 ring-1 ring-green-600' : 'border-red-600 ring-1 ring-red-600'}`}
                    />
                  </div>
                  <Button
                    onClick={() => changePw({ pwEmail, name, validCode, newPw })}
                    className="w-full"
                    disabled={!newPw || !checkNewPw}
                  >
                    비밀번호 변경하기
                  </Button>
                </CardContent>
              )}
            </Card>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
