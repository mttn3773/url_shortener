import { IError } from "../interface/errors.interface";

interface IValidationError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export const toErrorMap = (errors: {
  errors: IError[];
}): Record<string, string> => {
  const mappedErrors: Record<string, string> = {};

  errors.errors.map((error) => {
    if (error.param) mappedErrors[error.param] = error.msg;
  });

  return mappedErrors;
};
