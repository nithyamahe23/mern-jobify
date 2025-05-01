import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; //err.statusCode is the property in NotFoundError
    res.status(500).json({msg:err.message});
}

export default errorHandlerMiddleware;