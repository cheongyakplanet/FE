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

    const checkAndPushAd = () => {
      if (!adRef.current || pushAttempted.current) return;

      const element = adRef.current;
      const container = element.parentElement;
      const elementWidth = element.offsetWidth || 0;
      const containerWidth = container?.offsetWidth || 0;
      
      // Get computed styles to check for actual rendered width
      const computedStyle = window.getComputedStyle(element);
      const computedWidth = parseFloat(computedStyle.width) || 0;
      
      // Check all possible width sources
      const actualWidth = Math.max(elementWidth, containerWidth, computedWidth);
      
      console.log(`AdSense width check - Element: ${elementWidth}px, Container: ${containerWidth}px, Computed: ${computedWidth}px, Actual: ${actualWidth}px`);
      
      // Only proceed if we have a real width >= 250px (not forced)
      if (actualWidth >= 250 && actualWidth > 0) {
        try {
          if (window.adsbygoogle && !pushAttempted.current) {
            window.adsbygoogle.push({});
            pushAttempted.current = true;
            setIsLoaded(true);
            console.log(`AdSense loaded successfully for slot ${adSlot} with width ${actualWidth}px`);
          }
        } catch (err) {
          console.error(`AdSense push error for slot ${adSlot}:`, err);
          pushAttempted.current = false;
        }
      } else {
        console.warn(`AdSense container too narrow: ${actualWidth}px (minimum 250px required)`);
      }
    };

    const pushAd = () => {
      // Wait for the element to be visible and properly laid out
      const waitForLayout = () => {
        if (!adRef.current) return;

        // Use IntersectionObserver to wait for visibility
        const intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              // Element is visible, now check dimensions
              setTimeout(() => {
                checkAndPushAd();
              }, 100); // Small delay to ensure layout is complete
              intersectionObserver.disconnect();
            }
          });
        });

        intersectionObserver.observe(adRef.current);

        // Also use ResizeObserver for layout changes
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width } = entry.contentRect;
            if (width >= 250 && !pushAttempted.current) {
              checkAndPushAd();
              resizeObserver.disconnect();
              intersectionObserver.disconnect();
              break;
            }
          }
        });

        resizeObserver.observe(adRef.current);

        // Fallback timeout to prevent indefinite waiting
        const fallbackTimeout = setTimeout(() => {
          intersectionObserver.disconnect();
          resizeObserver.disconnect();
          if (!pushAttempted.current) {
            console.warn(`AdSense fallback timeout reached for slot ${adSlot}, skipping initialization`);
            // Don't force push if we can't get proper dimensions
            // This prevents the width error
          }
        }, 5000);

        return () => {
          intersectionObserver.disconnect();
          resizeObserver.disconnect();
          clearTimeout(fallbackTimeout);
        };
      };

      // Initial immediate check
      checkAndPushAd();
      
      // If not loaded, wait for proper layout
      if (!isLoaded && !pushAttempted.current && adRef.current) {
        return waitForLayout();
      }
    };

    if (document.readyState === 'complete') {
      pushAd();
    } else {
      const loadHandler = () => {
        // Wait a bit for layout to settle after load
        setTimeout(pushAd, 100);
      };
      window.addEventListener('load', loadHandler);
      return () => window.removeEventListener('load', loadHandler);
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