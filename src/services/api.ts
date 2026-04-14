// wayapi-cli/src/services/api.ts
import axios, { AxiosResponse } from 'axios';

interface HttpHeaders {
    [key: string]: string | string[] | undefined;
}

interface JsonValue {
    [key: string]: JsonValue | JsonValue[] | string | number | boolean | null;
}

type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
type ResponseBody = JsonObject | JsonArray | string | null;

export interface ApiResponse {
    body: ResponseBody;
    status: number;
    headers: HttpHeaders;
    time: number;
}

export interface ApiError {
    message: string;
    status?: number;
    time?: number;
}

function isValidResponseBody(data: unknown): data is ResponseBody {
    if (data === null) return true;
    if (typeof data === 'string') return true;
    if (typeof data === 'object') return true;
    return false;
}

export const request = async (
    method: string, 
    url: string, 
    data?: JsonObject | JsonArray
): Promise<ApiResponse> => {
    const start = Date.now();
    
    const response: AxiosResponse<unknown> = await axios({ 
        method, 
        url, 
        data 
    });
    
    const duration = Date.now() - start;
    
    if (!isValidResponseBody(response.data)) {
        throw new Error('Invalid response body type');
    }
    
    return {
        body: response.data,
        status: response.status,
        headers: response.headers as HttpHeaders,
        time: duration
    };
}