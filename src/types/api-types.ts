import { AxiosResponse } from 'axios';

export interface PageMetadata<T> {
  data: {
    content: T[];
    totalElements: number;
    totalPages: number;
    status: string;
  };
}

export interface FilterParams {
  page?: number | string;
  size?: number | string;
}

export interface PaginatedResponse<T> extends AxiosResponse<PageMetadata<T>> {
  data: PageMetadata<T>;
}

export interface ApiResponse<T> {
  data: T;
  status: string;
}
