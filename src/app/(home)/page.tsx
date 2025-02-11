import { Map } from 'react-kakao-maps-sdk';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle as="h4">가장 인기 있는 지역</CardTitle>
          <CardDescription>로그인 후 원하는 지역을 찜해보세요😉</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-5">
          <Map // 지도를 표시할 Container
            id="kakao-map"
            center={{
              // 지도의 중심좌표
              lat: 37.563685889,
              lng: 126.975584404,
            }}
            className="h-[400px] w-full rounded-2xl border shadow-md"
            level={8} // 지도의 확대 레벨
          />
          <div>graph</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h4">나의 관심지역 리스트</CardTitle>
        </CardHeader>
        <CardContent>
          <div>list</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h4">게시판</CardTitle>
        </CardHeader>
        <CardContent>
          <div>board</div>
        </CardContent>
      </Card>
    </div>
  );
}
