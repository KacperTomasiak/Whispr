import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }): Promise<void> => {
  const api: string = "http://localhost:3000";
  let response = await fetch(`${api}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await response.json();
  if (result.privateKey == "") {
    throw redirect(302, "/login");
  }
};
