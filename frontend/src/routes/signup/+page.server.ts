import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }): Promise<void> => {
  if (cookies.get("auth")) throw redirect(302, "/");
};
