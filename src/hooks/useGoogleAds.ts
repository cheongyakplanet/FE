import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function useGoogleAds(adSlot: string) {
  const adRef = useRef<HTMLModElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const pushAttempted = useRef(false);

  useEffect(() => {
    const checkAdSenseReady = () => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        setIsScriptReady(true);
        return true;
      }
      return false;
    };

    if (checkAdSenseReady()) {
      return;
    }

    const interval = setInterval(() => {
      if (checkAdSenseReady()) {
        clearInterval(interval);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      console.warn('AdSense script failed to load within timeout');
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isScriptReady || !adRef.current || pushAttempted.current || isLoaded) {
      return;
    }

    const pushAd = () => {
      try {
        if (window.adsbygoogle && !pushAttempted.current) {
          window.adsbygoogle.push({});
          pushAttempted.current = true;
          setIsLoaded(true);
        }
      } catch (err) {
        console.error(`AdSense push error for slot ${adSlot}:`, err);
      }
    };

    if (document.readyState === 'complete') {
      pushAd();
    } else {
      window.addEventListener('load', pushAd);
      return () => window.removeEventListener('load', pushAd);
    }
  }, [isScriptReady, adSlot, isLoaded]);

  useEffect(() => {
    return () => {
      pushAttempted.current = false;
      setIsLoaded(false);
    };
  }, [adSlot]);

  return { adRef, isLoaded, isScriptReady };
}