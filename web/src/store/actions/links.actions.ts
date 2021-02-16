import { ILinksAction } from "./../reducers/links.reducers";
import { ILinkPaylaod } from "./../../interface/linksGlobal.interface";
export const setLinks = (payload: ILinkPaylaod): ILinksAction => {
  return {
    type: "SET_LINKS",
    payload,
  };
};
