import axios from 'axios';

interface AxiosParams {
    link: string;
    params?: Record<string, string>;
    headers?: Record<string, string>;
    body?: Record<string, any>;
}

export async function AGET<T>({link,params,headers,} : AxiosParams) {
    try {
        const response = await axios.get<T>(link, {
        params,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        });
        return response.data;
    } catch (error: any) {
        console.error('GET Error:', error.message);
        throw error; // Re-throw error for caller handling
    }
}
export async function APOST<T>({link,params,headers,body} : AxiosParams) {
    try {
        const response = await axios.post<T>(link, body, {
        params,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        });
        return response.data;
    } catch (error: any) {
        console.error('POST Error:', error.message);
        throw error; // Re-throw error for caller handling
    }
}