
export interface useBaseApiConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  body?: Record<string, string | number | object | []> | string;
  [key: string]: any; // For additional options
}


// useFetch is only for SSR. Sometimes you want a non-SSR request for example when the app hasn't finished loading config.
// Example: on store init.

export const useStandardFetch = (url: string, params: object) => {
  const BASE_URL = useRuntimeConfig().public.apiBase + '/api';

  const instance = $fetch.create({
    baseURL: BASE_URL,
  });

  return instance(url, params);
};
