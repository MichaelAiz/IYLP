import { PostRequestBody, LoginRequestBody } from "../types";

export type RequestOptions = {
    headers: {
      authorization?: string;
    }
    body? : PostRequestBody | LoginRequestBody 
  };
  
  const request = async (method: string, url: RequestInfo, options?: RequestOptions) => {
    const headers = new Headers({
      "content-type": "application/json",
      ...(options?.headers?.authorization && { "Authorization": options.headers.authorization }),
    })

    console.log(options?.body)

    const body = JSON.stringify(options?.body)
    console.log(body)
    console.log("here")
    console.log(headers)
  
    const res = await fetch(url, {
      method,
      mode: "cors",
      body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${options?.headers.authorization}`
      }
    });

    console.log(res)
  
    return res.json();
  };
  
  export default request;
  