import { parseCSV } from '../src/parsers/csvParser';
import fs from 'fs';
import path from 'path';
import {parseJSON} from '../src/parsers/jsonParser';
import {parseXml} from '../src/parsers/xmlParser';
import { createParserFile } from './UtilFunctions';

afterAll(() => {
    // Clean up the directory containing dummy files creates during tests.
    const dummyFilesDir = path.resolve(__dirname, '../src/dummyFiles');
    if (fs.existsSync(dummyFilesDir)) {
        fs.rmSync(dummyFilesDir, { recursive: true, force: true });
    }
});


describe('CSV Parser: ', () => {
    it('should parse CSV file correctly', async () => {
        const filePath = path.join(__dirname, '..', 'src', 'data', 'Cake orders.csv'); 
        const data = await parseCSV(filePath);
        
        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is parsed an file is not empty
        expect(data[0]).toEqual(expect.arrayContaining(["id", "Type", "Flavor", "Filling", "Size", "Layers", "Frosting Type", "Frosting Flavor", "Decoration Color"])); // Check headers
    });
    it('should handle empty CSV file', async () => {
        // Create an empty CSV file for testing
        const emptyCSVFilePath = await createParserFile('empty.csv', '');
        const data = await parseCSV(emptyCSVFilePath);

        expect(data).toBeDefined();
        expect(data.length).toBe(0); // Expect no data in an empty file
    });
    it('should handle non-existent CSV file', async () => {
        const filePath = './src/data/non_existent.csv'; // Non-existent file
        await expect(parseCSV(filePath)).rejects.toThrow(); // Expect an error to be thrown
    });

    it ('should handle spaces and empty lines', async () => {
        // Create a CSV file with spaces and empty lines
        const spacesAndEmptyLinesFilePath = await createParserFile('spaces_and_empty_lines.csv', 'name,age\n\nJohn,30\n  \nJane,25\n'); // Create a CSV file with spaces and empty lines
        const data = await parseCSV(spacesAndEmptyLinesFilePath);

        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is parsed
    });
    it("should distinguish between delimiter and content", async () => {
        // Create a CSV file with delimiter vs content
        const delimiterVsContentFilePath = await createParserFile('delimiter_vs_content.csv', 'name,  age, "sarah, ss",20'); // Create a CSV file with delimiter vs content
        const data = await parseCSV(delimiterVsContentFilePath);

        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is parsed
    });
});

describe("json parser:", ()=>{
    it('should parse json file correctly', async () => {
        const filePath = path.join(__dirname, "..", "src", "data", "book orders.json");
        const data = await parseJSON(filePath);

        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is 
        const firstItem = data[0];
        expect(firstItem).toHaveProperty('Order ID');
        expect(firstItem).toHaveProperty('Quantity');

    });
    it('should handle non-existent json file', async () => {
        const filePath = './src/data/non_existent.json'; // Non-existent file
        await expect(parseJSON(filePath)).rejects.toThrow(); // Expect an error to be thrown
    });
    it('should handle malformed json data', async () => {
      //create a malformed JSON file for testing
        const malformedJsonFilePath= await createParserFile('malformed.json', '{ "Order ID": 1, "Book Title": "Test Book", ');

        await expect(parseJSON(malformedJsonFilePath)).rejects.toThrow(); // Expect an error to be thrown for malformed data
    });
    it('should handle empty json file', async () => {
        // Create an empty JSON file for testing
        const emptyJsonFilePath = await createParserFile('empty.json', ''); 
        const data = await parseJSON(emptyJsonFilePath);

        expect(data).toBeDefined();
        expect(data).toEqual([]); // Expect an empty object for an empty JSON file
    });
    it('should parse boolean json', async () => {
  const filePath = await createParserFile('boolean.json', 'true');
  const data = await parseJSON(filePath);
  expect(data).toBe(true);
});

it('should parse string json', async () => {
  const filePath = await createParserFile('string.json', '"hello"');
  const data = await parseJSON(filePath);
  expect(data).toBe("hello");
});

it('should parse number json', async () => {
  const filePath = await createParserFile('number.json', '42');
  const data = await parseJSON(filePath);
  expect(data).toBe(42);
});

it('should parse null json', async () => {
  const filePath = await createParserFile('null.json', 'null');
  const data = await parseJSON(filePath);
  expect(data).toBe(null);
});

})

describe("XML parser:", () => {
    it("should parse XML file correctly", async () => {
        const filePath = path.join(__dirname, "..", "src", "data", "toy orders.xml");
        const fileData = await parseXml(filePath);

        expect(fileData).toBeDefined();
        expect(fileData.data).toBeDefined();
        expect(fileData.data.row[0].OrderID).toBeDefined();
        expect(fileData.data.row[0].Quantity).toBeDefined();

    });

    it("should handle empty XML file", async () => {
        // Create an empty XML file for testing
        const emptyXmlFilePath = await createParserFile('empty.xml', '');
        const data = await parseXml(emptyXmlFilePath);

        expect(data).toBeDefined();
        expect(typeof data).toBe("object");
    });

    it("should handle non-existent XML file", async () => {
        const filePath = './src/data/non_existent.xml'; // Non-existent file
        await expect(parseXml(filePath)).rejects.toThrow(/Failed to parse XML/); // Expect an error to be thrown
    });

    it("should handle malformed XML data", async () => {
        // Create a malformed XML file for testing
        const malformedXmlFilePath = await createParserFile('malformed.xml', '<toyOrders><order><id>1</id><name>Test Toy</name></order>');
        await expect(parseXml(malformedXmlFilePath)).rejects.toThrow(); // Expect an error to be thrown for malformed data
    });
});
