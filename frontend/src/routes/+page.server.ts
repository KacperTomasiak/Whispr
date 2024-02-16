import { redirect } from "@sveltejs/kit";
import { getUserData } from "../shared/user.js";

export const load = async (): Promise<void> => {
  let result = await getUserData();
  if (result.privateKey == "") {
    throw redirect(302, "/login");
  }
};