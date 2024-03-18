import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  const code: number = res.statusCode
  const isProduction: boolean = process.env.NODE_ENV === 'production'

  if (code !== 500) {
    console.log(`code: ${code}, ${err}`)
    return res.status(code).json({
      code: code,
      message: '',
      body: {
        message: err.message,
        stack: isProduction ? '' : err.stack,
      },
    })
  } else {
    return res.status(500).json({
      code: 500,
      message: '',
      body: {
        message: 'Server error!',
        stack: isProduction ? '' : err.stack,
      },
    })
  }
}

module.exports = errorHandler

// import { NextFunction, Request, Response } from 'express'
// import AppError from '../utils/AppError'

// // Handle Cast Error in the Database
// const handleCastErrorDB = (err: any) => {
//   const message = `Invalid ${err.path}: ${err.value}`
//   return new AppError(message, 400)
// }

// // Handle Duplicate Fields Error in the Database
// // const handleDuplicateFieldsDB = (err: any) => {
// //   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
// //   const message = `Duplicate fields value: ${value}. Please use another value!`;
// //   return new AppError(message, 404);
// // };

// // Handle Validation Error in the Database
// const handleValidationErrorDB = (err: any) => {
//   const errors = Object.values(err.errors).map((el: any) => el.message)
//   const message = `Invalid input data: ${errors.join('. ')}`
//   return new AppError(message, 404)
// }

// // Handle JWT Token Error
// const handleJWTError = () => new AppError('Invalid Token, Please log in again', 401)

// // Handle Expired JWT Token Error
// const handleJWTExpiredError = () => new AppError('Expired Token, Please log in again', 401)

// // Send Error Response in Development Environment
// const sendErrorDev = (err: AppError, res: Response) => {
//   console.log(err)
//   res.status(err.statusCode).json({
//     code: err.statusCode,
//     status: err.status,
//     message: err.message,
//     stack: err.stack,
//   })
// }

// // Send Error Response in Production Environment
// const sendErrorProd = (err: AppError, res: Response) => {
//   // If it's an operational error, send a detailed error message to the client.
//   if (err.isOperational) {
//     console.error('ERROR', err)
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     })
//   } else {
//     // If it's not an operational error, don't leak error details to the client.
//     // 1. Log the error.
//     console.error('ERROR', err)
//     // 2. Send a generic error message.
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went wrong',
//     })
//   }
// }

// // Global Error Handling Middleware
// const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
//   err.statusCode = err.statusCode || 500
//   err.status = err.status || 'error'

//   if (process.env.NODE_ENV === 'development') {
//     sendErrorDev(err, res)
//   } else if (process.env.NODE_ENV === 'production') {
//     let error = err

//     if (error.name === 'CastError') error = handleCastErrorDB(error)
//     // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
//     if (error.name === 'ValidationError') error = handleValidationErrorDB(error)
//     if (error.name === 'JsonWebTokenError') error = handleJWTError()
//     if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()

//     sendErrorProd(error, res)
//   }
// }

// module.exports = errorHandler
