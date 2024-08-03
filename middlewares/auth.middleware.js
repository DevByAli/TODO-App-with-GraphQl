import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "../utils/errorHandler.js";

const AuthMiddleware = (req, res, next) => {
  if (!req.session.user) {
    throw new ErrorHandler(
      "Please login to access this route",
      StatusCodes.UNAUTHORIZED
    );
  }
  req.session.touch();
  next();
};

export default AuthMiddleware;
