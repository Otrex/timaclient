import Api from "./core/Api";
import type { Payload, Response } from "./interfaces";
import type { IRequestOptionEvents } from "./interfaces/utils";

export default class TimaAPI extends Api {
  async createUser(data: Payload.CreateUser, $on: IRequestOptionEvents['$on']) {
    return this.request<Response.CreateUser>({
      method: "POST",
      url: "/user/v1/account",
      data,
      $on,
    })
  }
}