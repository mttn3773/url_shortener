import { IError } from "./../interface/errors.interface";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { setUser } from "../store/actions/auth.actions";
export const checkUnauthorizedError = (
  errors: IError[],
  dispatch: Dispatch<any>
) => {
  errors.map((error) => {
    if (error.param === "authentication") {
      dispatch(setUser({}));
    }
  });
};
