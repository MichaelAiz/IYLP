import {
  FastifyReply,
  FastifyRequest,
  HTTPMethods
} from 'fastify';


function handler(arg: string) {
    const message = "yep you can login"
    if (!typeof(message) )
    return message
}


export default function login() {
  const url = '/login';

  return {
    method: 'GET' as HTTPMethods,
    url,
    attachValidation: true,
    handler
  };
}