import { httpClient } from "../httpClient";

interface MeResponse {
  accessToken: string;
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
}
