import { parseStringPromise } from "xml2js";
import fs from "fs";


export async function parseXml<T = any>(filePath: string): Promise<T> {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        if (!fileContent.trim()) {
            return {} as T; // Return an empty object if the file is empty
        }
        const result = await parseStringPromise(fileContent, {
            explicitArray: true,
            trim: true,
            mergeAttrs: true,
        });
        return result as T;
    } catch (error) {
        throw new Error(`Failed to parse XML: ${(error as Error).message}`);
    }
}