import { LoginRequestBody, PostConfig, RegisterRequestBody } from "../types";

export type RequestOptions = {
    headers?: {
      authorization?: string;
    }
    body? : PostConfig | LoginRequestBody | URLSearchParams | RegisterRequestBody | {hobby_id: string}
  };
  
  const request = async (method: string, url: RequestInfo, options: RequestOptions) => {
    const headers = new Headers({
      "content-type": "application/json",
      ...(options?.headers?.authorization && { "Authorization": options.headers.authorization }),
    })

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
  