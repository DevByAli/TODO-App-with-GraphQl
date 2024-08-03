import mongoose from "mongoose";
import { ErrorHandler } from "../utils/errorHandler.js";
import { StatusCodes } from "http-status-codes";

const IdValidationMiddleware = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID", StatusCodes.BAD_GATEWAY));
  }

  next();
};

export default IdValidationMiddleware;
