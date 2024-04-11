import { verify } from 'jsonwebtoken';
import { logger } from '@config/winston-logger';
import { errorLogging } from '@config/logger';
import { NextFunction, Request, Response } from 'express';

export const auth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const token = request.headers.authorization;
    logger.warn(token);
    if (token) {
      const verifyUser: any = verify(token, process.env.JWT_SECRET);
      // const tokenUser = await UserToken.findOne({ user: verifyUser._id })
      //   .populate('user')
      //   .lean();

      // const user = { ...tokenUser, ...tokenUser.user };
      // delete user.user;
      // if (!user || user?.disabled)
      //   return response.status(401).json({
      //     status: 401,
      //     message: 'Please login to access',
      //   });

      // request.token = token;
      // request.user = user;
      next();
    } else {
      response.status(401).json({
        status: 401,
        message: 'Please login to Access',
      });
    }
  } catch (error) {
    response.status(401).json({
      status: 401,
      message: "Invalid token",
    });
    errorLogging(error);
  }
};
