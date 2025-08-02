import * as fs from 'fs';

/**
 * Parses a JSON file and returns the JavaScript object.
 * @param filePath Path to the JSON file.
 * @returns Parsed JavaScript object.
 * @throws If the file cannot be read or JSON is invalid.
 */
export async function parseJSON<T = any>(filePath: string): Promise<T> {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    if(!fileContent.trim()) {
        return [] as T; // Return an empty array if the file is empty
    }
    try {
        return JSON.parse(fileContent) as T; // Parse the JSON content
    } catch (error) {
        throw new Error(`Failed to parse JSON from file ${filePath}: ${(error as Error).message}`);
    }

}

