import { httpClient } from "../client";
import { urls } from "../urls";

export async function getUser() {
  const response = await httpClient().get(urls.user);
  return response.data;
}

export async function deleteUser() {
  const response = await httpClient().delete(urls.user);
  return response.data;
}
