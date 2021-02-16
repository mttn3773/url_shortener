import { ILink } from "./link.interface";

export interface ICreateLink {
  from: ILink["from"];
  to: ILink["to"];
  owner: ILink["owner"];
  code: ILink["code"];
}
