import type { Industry } from "./core";
import type { IRequest } from "./utils";


export interface IGetIndustry extends IRequest<Industry[]> { }

export interface CreateUser extends IRequest<{
  message: string;
  publicId: string;
}> { }