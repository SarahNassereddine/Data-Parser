
    export class ApiException extends Error {
        constructor(public status: number, message: string, error: Error) {
            super(message);
            this.name = 'ApiException';
            this.stack= error.stack;
            this.status = status;
            this.message=`${message}: ${error.message}`;
        }
    }