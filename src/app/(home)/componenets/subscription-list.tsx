import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import { Bell, Building, Calendar, House, Info, MapPin, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import { useGetSubscriptionByMyRegion } from '@/services/home/hooks/useGetSubscriptionByMyRegion';

// 1. 청약 있는 경우, 없는 경우
export default function SubscriptionList() {
  const router = useRouter();
  const { data: getSubscriptionByMyRegion } = useGetSubscriptionByMyRegion();
  const subscriptions = getSubscriptionByMyRegion?.data ?? [];
  const totalSubscriptions = subscriptions.length;

  const groupedItems = [];
  for (let i = 0; i < subscriptions.length; i += 2) {
    groupedItems.push(subscriptions.slice(i, i + 2));
  }
  return (
    <div>
      <div className="rounded-lg bg-blue-50 p-2">
        <div className="flex items-center gap-2 text-xs text-blue-700">
          <Bell className="h-4 w-4" />
          <p className="font-medium">총 {totalSubscriptions}건의 청약 정보가 있습니다.</p>
        </div>
      </div>
      <Carousel>
        <CarouselContent>
          {groupedItems.map((group, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-2 gap-4 p-4">
                {group.map((item, index) => (
                  <Card
                    className="relative flex h-full cursor-pointer flex-col border-0 transition-all hover:shadow-lg"
                    key={index}
                    onClick={() => router.push(`/subscription/${item.id}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <House className="h-5 w-5 text-blue-500" />
                          <CardTitle className="line-clamp-1 text-lg">{item.houseNm}</CardTitle>
                        </div>
                      </div>

                      {item.totSuplyHshldco && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <div className="flex items-center rounded-full border bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                            <Users className="mr-1 h-3.5 w-3.5" />
                            {item.totSuplyHshldco}세대
                          </div>
                        </div>
                      )}

                      <CardDescription className="mt-2 flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {item.region} {item.city} {item.district}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="whitespace-nowrap text-xs font-medium">접수기간:</span>
                          <span className="text-xs">
                            {dayjs(item.rceptBgnde).format('YYYY.MM.DD')} ~{' '}
                            {dayjs(item.rceptEndde).format('YYYY.MM.DD')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span className="whitespace-nowrap text-xs font-medium">시행사:</span>
                          <span className="line-clamp-1 text-xs">{item.bsnsMbyNm}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="mt-auto border-t border-gray-100 p-3">
                      <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                        자세히 보기
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {totalSubscriptions > 2 && (
          <div>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        )}
      </Carousel>
    </div>
  );
}
