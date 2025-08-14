import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * Creates a file with the given name and content in the specified folder.
 * @param folder The folder to create the file in.
 * @param fileName Name of the file to create.
 * @param content Content to write to the file.
 * @returns The full path of the created file.
 */
export async function createParserFile(folder: string, fileName: string, content: string): Promise<string> {
    const folderPath = path.resolve(__dirname, folder);
    await fs.mkdir(folderPath, { recursive: true });

    const filePath = path.join(folderPath, fileName);

    try {
        await fs.access(filePath);
        // File exists, return path
        return filePath;
    } catch {
        // File does not exist, create it
    }

    await fs.writeFile(filePath, content, 'utf8');
    return filePath;
}