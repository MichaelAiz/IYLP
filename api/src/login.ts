import {
  FastifyReply,
  FastifyRequest,
  HTTPMethods
} from 'fastify';


function handler(req: FastifyRequest, reply: FastifyReply) {
    const message = "yep you can login"
    return reply.send(message)
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