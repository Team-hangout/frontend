import { useQuery, QueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_HOST } from '@/api/api';

type AnyOBJ = { [key: string]: any };

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

export const restFetcher = async ({
  method,
  path,
  body,
  params,
  headers
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
  headers?: AnyOBJ;
}) => {
  try {
    let url = `${BASE_HOST}${path}`;
    let axiosConfig: AxiosRequestConfig = {
      method,
    };
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += '?' + searchParams.toString();
    }
    if (body) axiosConfig.data = body;

    if (headers) {
      axiosConfig = { ...axiosConfig, headers };
    }
    const res = await axios(url, axiosConfig);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const QueryKeys = {
  POST: 'POST',
};
