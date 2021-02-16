import { checkUnauthorizedError } from "./../utils/checkUnauthorizedError";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotify } from "../store/actions/notify.actions";
import { IError } from "./../interface/errors.interface";
interface IRequestParams {
  url: string;
  method: string;
  body?: any;
  headers?: any;
}

export const useApi = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const request = async ({ url, method, body, headers }: IRequestParams) => {
    try {
      headers["Accept"] = "application/json, text/plain, */*";
      headers["Content-Type"] = "application/json";
      const jsonBody = JSON.stringify(body);
      setLoading(true);
      dispatch(setNotify({ loading: true }));
      const response: any = await fetch(url, {
        method,
        headers,
        credentials: "include",
        body: jsonBody,
      });
      const res = await response.json();
      if (res.errors) {
        checkUnauthorizedError([res.errors], dispatch);
        dispatch(setNotify({ errors: res.errors, loading: false }));
        return res;
      }
      dispatch(setNotify({ loading: false }));
      setLoading(false);
      return res;
    } catch (e) {
      checkUnauthorizedError([e], dispatch);
      dispatch(
        setNotify({
          errors: e.message || "Something went wrong",
          loading: false,
        })
      );
      setLoading(false);
      dispatch(setNotify({ loading: false }));
      return {
        errors: [{ msg: e.message || "Something went wrong" }],
      };
    }
  };
  const dispatchError = (e: IError) => {
    dispatch(
      setNotify({
        errors: [{ msg: e.msg || "Something went wrong" }],
      })
    );
  };

  const clearErrors = () => {
    dispatch(
      setNotify({
        errors: [],
      })
    );
  };
  return { loading, clearErrors, request, dispatchError };
};
