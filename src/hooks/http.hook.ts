interface IRequest {
    request: <T>(url: string, method?: string, body?: null | string, headers?: HeadersInit) => Promise<T>;
}

export const useHttp = (): IRequest => {

    let request: <T>(url: string, method?: string, body?: null | string, headers?: HeadersInit) => Promise<T>;

    request = async (url, method='GET', body = null, headers = { 'Content-Type': 'application/json', 'x-api-key':  '7da980d5-7375-4c82-801d-b46197db0139' }) => {
        
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json();

            return data;

        } catch (e) {
            throw e;
        }

    }

    return { request }
}