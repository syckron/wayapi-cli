// wayapi-cli/src/services/api.ts
import axios, { AxiosResponse, AxiosError } from 'axios';
import type { 
    JsonObject, 
    JsonArray, 
    ResponseBody, 
    ApiResponse, 
    HttpHeaders,
    JsonValue
} from '../types/types.js';

export const request = async (
    method: string, 
    url: string, 
    data?: JsonValue
): Promise<ApiResponse> => {
    const start = Date.now();
    
    try {
        const response: AxiosResponse<unknown> = await axios({ 
            method, 
            url, 
            data,
            timeout: 10000
        });
        
        return {
            body: response.data as ResponseBody,
            status: response.status,
            headers: response.headers as HttpHeaders,
            time: Date.now() - start
        };
    } catch (error) {
        const duration = Date.now() - start;
        const axiosError = error as AxiosError;

        return {
            body: (axiosError.response?.data as ResponseBody) || axiosError.message,
            status: axiosError.response?.status || 500,
            headers: (axiosError.response?.headers as HttpHeaders) || {},
            time: duration
        };
    }
}
