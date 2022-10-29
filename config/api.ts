type API = 'POSTS' | 'BOARDS';

const apiRoutes: Record<API, string> = {
  POSTS: '/api/posts',
  BOARDS: '/api/boards',
};

export const getApiAddress = (type: API) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const endpoint = isDevelopment
    ? process.env.NEXT_PUBLIC_API_ENDPOINT_DEV
    : process.env.NEXT_PUBLIC_API_ENDPOINT_PRODUCTION;

  return `${endpoint}/${apiRoutes[type]}`;
};
