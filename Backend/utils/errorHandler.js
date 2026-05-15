class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode=statusCode
        ErrorHandler.captureStackTrace(this, this.constructor)

    }
}

export default ErrorHandler