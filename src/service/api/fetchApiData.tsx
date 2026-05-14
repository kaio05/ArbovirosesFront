async function fetchApi(uri: string)
{
    try {
        const baseApi = process.env.REACT_APP_API_URL ?? ""
        
        const apiFetch = await fetch(baseApi + uri)

        return apiFetch
    } catch (error) {
        throw error
    }
}

export default async function getApiData(uri: string)
{
  try {
    const response = await fetchApi(uri)
    const json = await response.json()

    // Unwrap standard { message, data } response envelope
    if (json && typeof json === 'object' && 'data' in json) {
      return json.data
    }
    return json
  } catch (error) {

  }
}

async function postfetchApi(uri: string, options?: RequestInit, baseUrl?: string) {
  try {
      const baseApi = baseUrl ?? process.env.REACT_APP_API_URL ?? "";
      const apiFetch = await fetch(baseApi + uri, options);
      return apiFetch;
  } catch (error) {
      throw error;
  }
}

export async function postApiData(uri: string, data?: any, method: string = "GET", baseUrl?: string) {
  try {
      const options: RequestInit = {
          method: method,
          headers: {
              'Content-Type': 'application/json',
          },
          body: data ? JSON.stringify(data) : undefined,
      };

      const response = await postfetchApi(uri, options, baseUrl);
      const responseData = await response.json();

      return responseData;
  } catch (error) {
      throw error;
  }
}