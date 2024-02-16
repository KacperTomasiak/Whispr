import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ cookies }) => {
    cookies.set("auth", "true", {
      path: "/",
      maxAge: 60 * 60,
      httpOnly: false,
    });
    throw redirect(302, "/");
  },
};

export const load = async ({ cookies }): Promise<void> => {
  if (cookies.get("auth")) throw redirect(302, "/");
};
