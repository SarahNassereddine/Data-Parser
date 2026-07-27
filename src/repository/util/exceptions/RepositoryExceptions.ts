export class ItemNotFoundException extends Error{
    constructor(message:string){
        super(message);
        this.name="ItemNotFoundException";
    }
}
export class InvalidItemException extends Error{
    constructor(message:string){
        super(message);
        this.name="InvalidItemException";
    }}

export class InitializationException extends Error {
    constructor(message:string, error: Error){
        super(message);
        this.name="InitializationException";
        this.stack=error.stack;
        this.message=`${message}: ${error.message}`; // to know exactly the type of db error.
    }
}

export class dbException extends Error {
    constructor(message:string, error: Error){
        super(message);
        this.name="dbException";
        this.stack=error.stack;
        this.message=`${message}: ${error.message}`; }
    }