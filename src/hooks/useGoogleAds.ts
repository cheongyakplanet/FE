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
        if (window.adsbygoogle && !pushAttempted.current && adRef.current) {
          // Check if the ad container has proper dimensions
          const container = adRef.current.parentElement;
          const containerWidth = container?.offsetWidth || 0;
          
          if (containerWidth < 250) {
            // Wait a bit more for layout to stabilize
            setTimeout(() => {
              const newWidth = container?.offsetWidth || 0;
              if (newWidth >= 250 && !pushAttempted.current) {
                window.adsbygoogle.push({});
                pushAttempted.current = true;
                setIsLoaded(true);
              } else if (newWidth < 250) {
                console.warn(`AdSense container too narrow: ${newWidth}px (minimum 250px required)`);
              }
            }, 500);
            return;
          }
          
          window.adsbygoogle.push({});
          pushAttempted.current = true;
          setIsLoaded(true);
        }
      } catch (err) {
        console.error(`AdSense push error for slot ${adSlot}:`, err);
        // Reset flag to allow retry
        pushAttempted.current = false;
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