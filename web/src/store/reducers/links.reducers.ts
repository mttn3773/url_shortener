import { ILinkPaylaod } from "./../../interface/linksGlobal.interface";
export interface ILinksAction {
  type: string;
  payload: ILinkPaylaod;
}

export const linksReducer = (state: any = {}, action: any) => {};
