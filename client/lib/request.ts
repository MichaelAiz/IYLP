import { LoginRequestBody, PostConfig, RegisterRequestBody } from "../types";

export type RequestOptions = {
    headers?: {
      authorization?: string;
    }
    body? : PostConfig| LoginRequestBody | URLSearchParams | RegisterRequestBody
  };
  
  const request = async (method: string, url: RequestInfo, options: RequestOptions) => {
    const headers = new Headers({
      "content-type": "application/json",
      ...(options?.headers?.authorization && { "Authorization": options.headers.authorization }),
    })

    console.log(options?.body)

    const body = JSON.stringify(options?.body)
  
    const res = await fetch(url, {
      method,
      mode: "cors",
      body,
      headers
    });
  
    return res.json();
  };
  
  export default request;
  