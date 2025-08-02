import logger from "./logger/logger";
import { parseCSV } from "./parsers/csvParser";
import { parseXml } from "./parsers/xmlParser";
import { parseJSON } from "./parsers/jsonParser";
import path from "path";

const csvFilePath = path.join(__dirname, "data", "cake orders.csv");
const xmlFilePath = path.join(__dirname, "data", "toy orders.xml");
const jsonFilePath = path.join(__dirname, "data", "book orders.json");
 

function logCSVOrder(parsedData: string[][]):void {
   logger.info("logging csv file..");
  if(!parsedData || parsedData.length<=1){
    logger.info("no orders yet");
  }
  else{

  const headers = parsedData[0];
  const rows = parsedData.slice(1);

  rows.forEach((row, i) => {
    const line = headers.map((header, idx) => `${header}=${row[idx] ?? ""}`).join(", ");
    logger.info(`Order ${i + 1}: ${line}`);
  });
  }
}
function logJSONOrder(parsedJson: any): void {
  logger.info("logging JSON file...");
  //main cases: 1 empty file

  if (!parsedJson) {
    logger.info("No orders yet.");
    return;
  }
  //2 array of objects ie of of orders
  if (Array.isArray(parsedJson)) {
    if (parsedJson.length === 0) {
      logger.info("Array is empty.");
    } else {
      parsedJson.forEach((item, index) => {
       const props = Object.entries(item)
  .map(([key, value]) => `${key}: ${value}`)
  .join(', ');
logger.info(`Order ${index + 1}: ${props}`);

      });
    }
  } 
  //3 single object ie one order
  else if (typeof parsedJson === "object") {
    const entries = Object.entries(parsedJson);
    if (entries.length === 0) {
      logger.info("Object is empty.");
    } else {
     const props = entries
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(', ');

  logger.info(`Order is : ${props}`);
      }
    }
  } // no need to check strings,booleans or num bcz we are logging orders.



function logXmlOrders(xmlParsed: any): void {
   logger.info("logging xml file..");
  if(!xmlParsed?.data?.row) // data must have xml.data.row hierarchy. it handles also if we have empty{}
    {logger.info("no orders yet");
      return;
    }
    const orders = xmlParsed.data.row;
    orders.forEach((order: any, index: number) => {
    const props = Object.entries(order)
      .map(([key, value]) => {
        const val = Array.isArray(value) ? value[0] : value;
        return `${key}=${val}`;
      })
      .join(', ');

    logger.info(`Order ${index + 1}: ${props}`);
  });
}
async function runParsers(){
// logging csv
const parsedData= await parseCSV(csvFilePath);
logCSVOrder(parsedData);

//logging json
const parsedJson = await parseJSON(jsonFilePath);
logJSONOrder(parsedJson);


//logging xml
const parsedXml= await parseXml(xmlFilePath);
logXmlOrders(parsedXml);

logger.info("congrats! finished parsing.");}
runParsers();