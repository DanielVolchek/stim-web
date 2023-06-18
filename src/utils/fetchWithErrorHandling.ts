import Cookies from "js-cookie";
import useErrorStore from "./useErrorStore";

type HandlerOptions = {
  withAuth?: boolean;
};

export default async function fetchWithErrorHandling(
  route: string,
  fetchOptions?: { headers?: { [key: string]: any }; [key: string]: any },
  handlerOptions?: HandlerOptions
) {
  let headers = fetchOptions?.headers ?? {};

  if (handlerOptions?.withAuth) {
    headers = { ...headers, Cookie: Cookies.get("session") as string };
  }

  const res = await fetch(route, { ...fetchOptions, headers: headers });

  const data = await res.json();

  if (data.error) {
    if (typeof window !== "undefined") {
      useErrorStore.setState({ error: data.error });
    }
  }

  return data;
}
