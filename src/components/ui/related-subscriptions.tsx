'use client';

import { useRouter } from 'next/navigation';

import { Calendar, Home, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetSubscriptionByRegion } from '@/services/subscription/hooks/useGetSubscriptionByRegion';
import { SubscriptionListDto } from '@/services/subscription/types';

interface RelatedSubscriptionsProps {
  currentSubscriptionId: string;
  region: string;
  city: string;
  className?: string;
}

// Utility function to generate SEO-friendly slug
function generateSlug(houseNm: string): string {
  return houseNm
    .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .toLowerCase();
}

// Date formatting function
function formatDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
  });
}

export function RelatedSubscriptions({ 
  currentSubscriptionId, 
  region, 
  city, 
  className 
}: RelatedSubscriptionsProps) {
  const router = useRouter();
  const { data: regionSubscriptions, isLoading } = useGetSubscriptionByRegion(region, city);

  // Filter out the current subscription and limit to 3 items
  const relatedSubscriptions = regionSubscriptions?.data
    ?.filter((sub: SubscriptionListDto) => sub.id !== currentSubscriptionId)
    ?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold text-slate-900">관련 청약 정보</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (relatedSubscriptions.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold text-slate-900">관련 청약 정보</h3>
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-gray-500">해당 지역의 다른 청약 정보가 없습니다.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => router.push('/subscription')}
          >
            전체 청약 정보 보기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          {region} {city} 지역의 다른 청약
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push(`/subscription?region=${encodeURIComponent(region)}&city=${encodeURIComponent(city)}`)}
        >
          더 보기
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {relatedSubscriptions.map((subscription: SubscriptionListDto) => {
          const slug = generateSlug(subscription.houseNm);
          
          return (
            <Card 
              key={subscription.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => router.push(`/subscription/${subscription.id}/${slug}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-2 text-base leading-tight">
                    {subscription.houseNm}
                  </CardTitle>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {subscription.rentSecdNm}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3" />
                  {subscription.district}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">접수:</span>
                    <span>
                      {formatDate(subscription.rceptBgnde)} ~ {formatDate(subscription.rceptEndde)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-3 w-3" />
                    <span className="text-xs">공급:</span>
                    <span>{subscription.totSuplyHshldco || 0}세대</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default RelatedSubscriptions;