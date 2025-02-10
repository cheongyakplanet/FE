import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>
            <h4>가장 인기 있는 지역</h4>
          </CardTitle>
          <CardDescription>로그인 후 원하는 지역을 찜해보세요😉</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2">
          <div>map</div>
          <div>graph</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <h4>나의 관심지역 리스트</h4>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>list</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <h4>게시판</h4>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>board</div>
        </CardContent>
      </Card>
    </div>
  );
}
