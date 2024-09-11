import axios from "axios";
import { getSessionToken } from "../src/libs/session-manager";

export const httpClient = () => {
  const token = getSessionToken();
  return axios.create({
    baseURL: "http://localhost:3000",
    timeout: 2000,
    headers: { Authorization: `Bearer ${token}` },
  });
};
