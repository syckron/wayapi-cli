// wayapi-cli/src/types/types.ts
export interface HttpHeaders {
    [key: string]: string | string[] | undefined;
}

export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonObject
    | JsonArray;
    

export type ResponseBody =
    | JsonObject
    | JsonArray
    | string
    | null;
    
export type InkColor =
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "gray";

export type Mode = 
    | "url"
    | "method"
    | "body"
    | "content";
    
export type ModeContents =
    | "body"
    | "headers";
    
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

export type Info = {
    status: number | null;
    time: number | null;
}

export interface ApiResponse {
    body: ResponseBody;
    status: number;
    headers: HttpHeaders;
    time: number;
}

export interface Contents {
    body: ResponseBody;
    headers: Record<string, string> | null;
}

export interface PayLoadStatus {
    valid: boolean | null;
    message: string;
}