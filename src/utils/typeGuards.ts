// wayapi-cli/src/utils/typeGuards.ts
import type { JsonObject, JsonArray } from '../types/types.js';

export function isJsonObject(value: unknown): value is JsonObject {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isJsonArray(value: unknown): value is JsonArray {
    return Array.isArray(value);
}

export function parseJsonSafely(text: string) {
    try {
        const parsed: unknown = JSON.parse(text);
        
        if (isJsonObject(parsed) || isJsonArray(parsed)) {
            return { 
                success: true, 
                data: parsed as JsonObject | JsonArray 
            };
        }
        
        return { success: false, error: 'The content is not a valid JSON object or array.' };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Invalid JSON' };
    }
}
