import fs from 'fs';
import { parse } from 'csv-parse';


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

