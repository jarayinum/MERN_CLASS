export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || res.statusCode || 500;
  const payload = {
    success: false,
    message: error.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  };

  res.status(statusCode).json(payload);
};

