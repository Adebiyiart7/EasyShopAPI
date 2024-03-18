import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const code: number = res.statusCode;
  const isProduction: boolean = process.env.NODE_ENV === "production";

  if (code !== 500) {
    console.log(`code: ${code}, ${err}`);
    return res.status(code).json({
      code: code,
      message: "",
      body: {
        message: err.message,
        stack: isProduction ? "" : err.stack,
      },
    });
  } else {
    return res.status(500).json({
      code: 500,
      message: "",
      body: {
        message: "Server error!",
        stack: isProduction ? "" : err.stack,
      },
    });
  }
};

export default errorMiddleware;
