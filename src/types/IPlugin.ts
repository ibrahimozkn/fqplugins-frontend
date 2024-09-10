import { ILicense } from "./ILicense";

export interface IPlugin {
  id: number;
  name: string;
  version: string;
  licenses: ILicense[];
}
