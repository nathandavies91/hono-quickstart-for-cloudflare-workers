import { WithMessage } from "../types";

export const withMessage = (message: string): WithMessage => {
  return {
    message,
  };
};