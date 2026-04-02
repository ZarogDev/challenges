export class HttpClientError extends Error {
    status;
    name;
    constructor(message, { status }) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}
export class BadRequestError extends HttpClientError {
    constructor(message) {
        super(message, { status: 400 });
    }
}
export class UnAuthorizedError extends HttpClientError {
    constructor(message) {
        super(message, { status: 401 });
    }
}
export class ForbiddenError extends HttpClientError {
    constructor(message) {
        super(message, { status: 403 });
    }
}
export class NotFoundError extends HttpClientError {
    constructor(message) {
        super(message, { status: 404 });
    }
}
export class ConflictError extends HttpClientError {
    constructor(message) {
        super(message, { status: 409 });
    }
}
