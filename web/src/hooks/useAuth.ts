import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IError } from "../interface/errors.interface";
import { IRootState } from "../interface/rootState.interface";
import { IUser } from "../interface/user.interface";
import { setUser } from "../store/actions/auth.actions";
import { setNotify } from "../store/actions/notify.actions";
import { useApi } from "./useApi";

export const useAuth = () => {
  const { request, dispatchError } = useApi();
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      return setIsLogged(true);
    }
    request({
      url: "/api/user/me",
      method: "GET",
      headers: {},
    }).then(
      (res: { user?: IUser; error?: IError }) => {
        if (res.error) {
          return setIsLogged(false);
        }

        dispatch(setUser({ user: res.user }));
        return setIsLogged(true);
      },
      (e) => {
        setIsLogged(false);
        dispatchError(e);
      }
    );
  }, []);
  return isLogged;
};
