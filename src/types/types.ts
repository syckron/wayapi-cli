// wayapi-cli/src/types/types.ts
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

export interface Contents {
    body: ResponseBody;
    headers: HttpHeaders | null;
}