import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {

    //create constructor
    constructor(message){
        super(message);
        this.name = 'NotFoundError';    //Jus to showcase. We will not use it
        this.statusCode = StatusCodes.NOT_FOUND;   //We will use this one
    }
}

//Bad Request Error
export class BadRequestError extends Error{
    constructor(message){
        super(message);
        this.name = "BadRequestError";
        this.statusCode = StatusCodes.BAD_REQUEST;
    }

}

//UnAuthenticated Error
export class UnAuthenticatedError extends Error{
    constructor(message){
        super(message);
        this.name = "UnAuthenticatedError";
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

//UnAuthorized Error
export class UnAuthorizedError extends Error{
    constructor(message){
        super(message);
        this.name = "UnAuthorizedError";
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}