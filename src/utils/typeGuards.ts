// wayapi-cli/src/utils/TypeGuards.ts
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

export function isJsonObject(value: unknown): value is JsonObject {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isJsonArray(value: unknown): value is JsonArray {
    return Array.isArray(value);
}

export function parseJsonSafely(text: string): { 
    success: true; 
    data: JsonObject | JsonArray 
} | { 
    success: false; 
    error: string 
} {
    try {
        const parsed: unknown = JSON.parse(text);
        
        if (isJsonObject(parsed) || isJsonArray(parsed)) {
            return { success: true, data: parsed };
        }
        
        return { 
            success: false, 
            error: 'Parsed value is not a valid JSON object or array' 
        };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Invalid JSON' 
        };
    }
}
