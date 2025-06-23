"use server";

import { cookies } from "next/headers";
const api = process.env.NEXT_PUBLIC_SERVER_URL!;
export async function getLoggedUserData() {
  const token = (await cookies()).get("jwt")?.value;
  const data = await fetch(`${api}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await data.json();
  return user;
}
