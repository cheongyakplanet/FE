'use client';

import { useGoogleAds } from '@/hooks/useGoogleAds';

interface GoogleAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid';
  style?: React.CSSProperties;
  className?: string;
  layoutKey?: string;
  fullWidthResponsive?: boolean;
}

export function GoogleAd({
  adSlot,
  adFormat = 'auto',
  style,
  className = '',
  layoutKey,
  fullWidthResponsive = true,
}: GoogleAdProps) {
  const { adRef, isLoaded, isScriptReady } = useGoogleAds(adSlot);

  if (!isScriptReady) {
    return (
      <div className={`flex h-24 items-center justify-center bg-gray-50 ${className}`} style={{ minWidth: '250px', ...style }}>
        <div className="text-xs text-gray-400">광고 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={className} style={{ minWidth: '250px' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minWidth: '250px',
          width: '100%',
          ...style,
        }}
        data-ad-client="ca-pub-7334667748813914"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
        {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
      />
      {!isLoaded && isScriptReady && (
        <div className="flex h-16 items-center justify-center bg-gray-50" style={{ minWidth: '250px' }}>
          <div className="text-xs text-gray-400">광고 준비 중...</div>
        </div>
      )}
    </div>
  );
}