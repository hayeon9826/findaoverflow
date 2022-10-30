import axios, { AxiosInstance } from 'axios';

export const apiInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? ``
      : `${process.env.NEXT_PUBLIC_API_ENDPOINT_PRODUCTION}`,
});
