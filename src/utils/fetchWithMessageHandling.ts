import Cookies from "js-cookie";
import useClientMessageStore from "./useClientMessageStore";

type HandlerOptions = {
  withAuth?: boolean;
  onSuccess?: string;
  onError?: string;
};

export default async function fetchWithMessageHandling(
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
      useClientMessageStore.setState({
        clientMessage: {
          type: "ERROR",
          message: handlerOptions?.onError && data.error,
        },
      });
    }
  } else {
    useClientMessageStore.setState({
      clientMessage: {
        type: "SUCCESS",
        message: handlerOptions?.onSuccess && data.message,
      },
    });
  }

  return data;
}
