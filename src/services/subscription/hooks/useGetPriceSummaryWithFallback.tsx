import { useEffect, useState } from 'react';
import { GET_price_summary_by_id, GET_price_summary_by_region } from '../api';
import { PriceSummaryDto } from '../types';

import { useQuery } from '@tanstack/react-query';

interface PriceSummaryState {
  data: PriceSummaryDto[] | null;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export const useGetPriceSummaryWithFallback = (
  subscriptionId: string,
  region: string,
  city: string,
) => {
  const [state, setState] = useState<PriceSummaryState>({
    data: null,
    isLoading: false,
    error: null,
    isEmpty: false,
  });

  const enabled = !!subscriptionId && !!region && !!city;

  // Primary API call
  const primaryQuery = useQuery({
    queryKey: ['price-summary-primary', subscriptionId],
    queryFn: () => GET_price_summary_by_id(subscriptionId),
    enabled: enabled,
    retry: false,
    staleTime: 60000,
  });

  // Secondary API call - only enabled when primary fails or returns empty data
  const secondaryQuery = useQuery({
    queryKey: ['price-summary-secondary', region, city],
    queryFn: () => GET_price_summary_by_region({ region, city }),
    enabled: false, // Will be enabled manually
    retry: false,
    staleTime: 60000,
  });

  useEffect(() => {
    if (!enabled) {
      setState({
        data: null,
        isLoading: false,
        error: null,
        isEmpty: false,
      });
      return;
    }

    // Handle primary query states
    if (primaryQuery.isLoading && !primaryQuery.data) {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));
      return;
    }

    if (primaryQuery.isSuccess && primaryQuery.data) {
      const primaryData = primaryQuery.data.data.data;
      
      // Check if primary data is empty
      if (!primaryData || !Array.isArray(primaryData) || primaryData.length === 0) {
        // Trigger secondary query
        secondaryQuery.refetch();
        return;
      }

      // Primary data is available
      setState({
        data: primaryData,
        isLoading: false,
        error: null,
        isEmpty: false,
      });
      return;
    }

    if (primaryQuery.isError) {
      // Trigger secondary query on primary error
      secondaryQuery.refetch();
      return;
    }
  }, [
    primaryQuery.isLoading,
    primaryQuery.isSuccess,
    primaryQuery.isError,
    primaryQuery.data,
    enabled,
    secondaryQuery,
  ]);

  useEffect(() => {
    // Handle secondary query states
    if (secondaryQuery.isLoading) {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));
      return;
    }

    if (secondaryQuery.isSuccess && secondaryQuery.data) {
      const secondaryData = secondaryQuery.data.data.data;
      
      if (!secondaryData || !Array.isArray(secondaryData) || secondaryData.length === 0) {
        // Both APIs returned empty data
        setState({
          data: null,
          isLoading: false,
          error: null,
          isEmpty: true,
        });
        return;
      }

      // Secondary data is available
      setState({
        data: secondaryData,
        isLoading: false,
        error: null,
        isEmpty: false,
      });
      return;
    }

    if (secondaryQuery.isError) {
      // Both APIs failed
      setState({
        data: null,
        isLoading: false,
        error: '실거래가 데이터를 불러오는 중 오류가 발생했습니다.',
        isEmpty: false,
      });
      return;
    }
  }, [
    secondaryQuery.isLoading,
    secondaryQuery.isSuccess,
    secondaryQuery.isError,
    secondaryQuery.data,
  ]);

  return {
    data: Array.isArray(state.data) ? state.data : [],
    isLoading: state.isLoading,
    error: state.error,
    isEmpty: state.isEmpty,
  };
};