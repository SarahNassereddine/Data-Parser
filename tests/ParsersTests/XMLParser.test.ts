import { parseXml } from '../../src/parsers/xmlParser';
import fs from 'fs';
import path from 'path';
import { createParserFile } from './UtilFunction';

describe("XML parser:", () => {
    const dummyFilesDir = path.resolve(__dirname, './dummyXMLFiles');
    it("should parse XML file correctly", async () => {
    const filePath = await createParserFile(dummyFilesDir, 'toys.xml',
        `<?xml version='1.0' encoding='utf-8'?>
        <data>
            <row>
                <OrderID>5001</OrderID>
                <Quantity>7</Quantity>
            </row>
        </data>`
    );
    const fileData = await parseXml(filePath);
        expect(fileData).toBeDefined();
        expect(fileData.data).toBeDefined();
        expect(fileData.data.row[0].OrderID).toBeDefined();
        expect(fileData.data.row[0].Quantity).toBeDefined();
        expect(fileData.data.row[0].OrderID[0]).toBe('5001'); // [0] because explicitArray:true
        expect(fileData.data.row[0].Quantity[0]).toBe('7');

    });

    it("should handle empty XML file", async () => {
        // Create an empty XML file for testing
        const emptyXmlFilePath = await createParserFile(dummyFilesDir,'empty.xml', '');
        const data = await parseXml(emptyXmlFilePath);

        expect(data).toBeDefined();
        expect(data).toEqual({});
    });

    it("should throw an error if non-existent XML file", async () => {
        const filePath = './src/data/non_existent.xml'; // Non-existent file
        await expect(parseXml(filePath)).rejects.toThrow(/Failed to parse XML/); // Expect an error to be thrown
    });

    it("should handle malformed XML data", async () => {
        // Create a malformed XML file for testing
        const malformedXmlFilePath = await createParserFile(dummyFilesDir,'malformed.xml', '<toyOrders><order><id>1</id><name>Test Toy</name></order>');
        await expect(parseXml(malformedXmlFilePath)).rejects.toThrow(); // Expect an error to be thrown for malformed data
    });
    afterAll(() => {
        // Clean up the directory containing dummy files creates during tests.
        if (fs.existsSync(dummyFilesDir)) {
            fs.rmSync(dummyFilesDir, { recursive: true, force: true });
        }});
});