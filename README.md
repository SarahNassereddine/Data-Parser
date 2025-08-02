# Assignment 1: CSV, XML, and JSON Parser
This project is a Node.js application that parses and logs order data from three file formats: **CSV**, **JSON**, and **XML**.

## Features

-  Parses CSV, JSON, and XML files using parsers.
-  Logs each order to the console in a readable format.
-  Handles edge cases like:
  - Empty files
  - Malformed files
  - Single object vs arrays
  - Missing fields

## Technologies Used

- Node.js
- TypeScript
- xml2js (for XML parsing)
- Custom logger (using `winston` or a similar library)


## Main Commands

- `npm run dev`: run the project in development mode
- `npm run build`: compile TypeScript to JavaScript  
- `npm start`: run the compiled project  
- `npm run clean`: remove the build folder (Windows only command as is)

> ⚠️ If you are using macOS or Linux, replace the `clean` script in `package.json` with:
> "clean": "rm -rf build"
> to properly delete the build folder.
