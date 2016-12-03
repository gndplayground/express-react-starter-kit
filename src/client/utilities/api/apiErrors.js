function APIError(setOpts) {

    let defaultOpts = {
        message: 'Api Error',
        response: false,
    };

    let opts = Object.assign({}, defaultOpts, setOpts);

    this.name = 'APIError';
    this.message = opts.message;
    this.response = opts.response;
}

APIError.prototype = Object.create(Error.prototype);

function APIUnauthorized(setOpts) {

    let defaultOpts = {
        message: 'Api return unauthorized',
        response: false,
    };

    let opts = Object.assign({}, defaultOpts, setOpts);

    this.name = 'APIUnauthorized';
    this.message = opts.message;
    this.response = opts.response;
}

APIUnauthorized.prototype = Object.create(Error.prototype);

function APIInternalError(setOpts) {
    let defaultOpts = {
        message: 'Api return error',
        response: false,
    };

    let opts = Object.assign({}, defaultOpts, setOpts);

    this.name = 'APIInternalError';
    this.message = opts.message;
    this.response = opts.response;
}

APIInternalError.prototype = Object.create(Error.prototype);

export {APIInternalError, APIUnauthorized, APIError}