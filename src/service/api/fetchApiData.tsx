import api from './Api';

function unwrapApiData(payload: any) {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data;
  }

  return payload;
}

export default async function getApiData(uri: string) {
  try {
    const response = await api.get(uri);
    return unwrapApiData(response.data);
  } catch (error) {
    throw error;
  }
}

async function postExternalApi(uri: string, options?: RequestInit, baseUrl?: string) {
  const apiFetch = await fetch(`${baseUrl ?? ''}${uri}`, options);
  return apiFetch;
}

export async function postApiData(uri: string, data?: any, method: string = 'GET', baseUrl?: string) {
  try {
    if (baseUrl) {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      };

      const response = await postExternalApi(uri, options, baseUrl);
      return response.json();
    }

    const response = await api.request({
      url: uri,
      method,
      data,
    });

    return unwrapApiData(response.data);
  } catch (error) {
    throw error;
  }
}
