import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export function useKakaoMap() {
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkKakaoReady = () => {
      if (typeof window !== 'undefined' && window.kakao?.maps) {
        return true;
      }
      return false;
    };

    const initializeMap = () => {
      try {
        if (checkKakaoReady()) {
          window.kakao.maps.load(() => {
            setIsMapReady(true);
            setIsLoading(false);
            setError(null);
          });
        } else {
          throw new Error('Kakao Maps SDK not loaded');
        }
      } catch (err) {
        console.error('Kakao Maps initialization error:', err);
        setError('지도를 불러오는데 실패했습니다. 페이지를 새로고침해주세요.');
        setIsLoading(false);
      }
    };

    if (checkKakaoReady()) {
      initializeMap();
      return;
    }

    let attempts = 0;
    const maxAttempts = 50;
    const interval = setInterval(() => {
      attempts++;
      if (checkKakaoReady()) {
        clearInterval(interval);
        initializeMap();
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        setError('지도를 불러오는데 실패했습니다. 네트워크 연결을 확인해주세요.');
        setIsLoading(false);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const geocodeAddress = (address: string): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!isMapReady || !window.kakao?.maps?.services) {
        reject(new Error('Kakao Maps not ready'));
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          });
        } else {
          reject(new Error('Address not found'));
        }
      });
    });
  };

  return {
    isMapReady,
    isLoading,
    error,
    geocodeAddress,
  };
}