const errorHandler = (error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        ...error,
        message: error.message,
        // errors: error?.errors,
        // stack: error.stack,
    });
};

export { errorHandler };
