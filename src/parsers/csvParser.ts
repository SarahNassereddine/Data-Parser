import fs from 'fs';
import fsp from 'fs/promises';  // writeFile
import { parse } from 'csv-parse';
import { stringify as csvStringify } from "csv-stringify";


export async function parseCSV (filePath: string): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      const results: string[][] = [];
      const fileStream=fs.createReadStream(filePath);

      fileStream.on('error', (err) => {
      reject(err);
    });

        fileStream.pipe(parse({ skip_empty_lines: true, trim: true}))
        .on('data', (row: string[]) => {
          results.push(row);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    });
  }

export async function writeCSVFile(filePath: string, data: string[][]): Promise<void> {
    try {
        const csvContent = await new Promise<string>((resolve, reject) => {
            csvStringify(data, (err, output) => {
                if (err) return reject(err);
                resolve(output);
            });
        });

        await fsp.writeFile(filePath, csvContent, 'utf-8');
    } catch (error) {
        throw new Error(`Error writing CSV file: ${error}`);
    }
}