import type TimaAPI from ".";
import Api from "../core/Api";
import type { InstagramProfileResponse, YoutubeChannelResponse } from "./types/responses";

export default class SocialsAPI extends Api {
  tima: TimaAPI;

  static readonly SOCIALS = ["youtube", "instagram", "tiktok"];
  constructor(private api: TimaAPI) {
    super();
    this.tima = api
  }

  async getYoutubeByUsername(username: string) {
    return this.request<YoutubeChannelResponse>({
      url: `/youtube/channel/${username}`,
      method: "GET",
    });
  }

  async getInstagramByUsername(username: string) {
    return this.request<InstagramProfileResponse>({
      url: `/instagram/profile/${username}`,
      method: "GET",
    });
  }

  async getTiktokByUsername(username: string) {
    return this.request<any>({
      url: `/tiktok/user/${username}`,
      method: "GET",
    });
  }

  async getYoutubePostByUsername(username: string) {
    return this.request<any>({
      url: `/youtube/channel_videos/${username}`,
      method: "GET",
    });
  }

  async getInstagramPostByUsername(username: string) {
    return this.request<any>({
      url: `/instagram/posts/${username}`,
      method: "GET",
    });
  }

  async getTiktokPostByUsername(username: string) {
    return this.request<any>({
      url: `/tiktok/user/${username}/posts`,
      method: "GET",
    });
  }
}