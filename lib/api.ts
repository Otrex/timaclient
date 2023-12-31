import Api from "./core/Api";
import type { Payload, Response } from "./interfaces";

export default class TimaAPI extends Api {
  async createUser(data: Payload.CreateUser) {
    return this.request<Response.CreateUser>({
      method: "POST",
      url: "/user/v1/account",
      data,
    })
  }
}