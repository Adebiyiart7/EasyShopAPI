import { Request, Response, NextFunction } from 'express'

const asyncHandler = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res)
    } catch (error) {
      next(error)
    }
  }
}

export default asyncHandler
