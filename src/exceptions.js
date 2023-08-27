export default class Exception {
    constructor(statusCode,{status, message, payload} ) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.payload = payload || null;
    }
}