import { WebSessionStore } from "~/lib/core/LocalStore";

export const auth = new WebSessionStore<{
  accessToken: string; userType: string
}>("auth");

export const profile = new WebSessionStore<Array<Record<string, any>>>("profile");

