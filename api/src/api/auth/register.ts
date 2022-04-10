import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods
  } from 'fastify';
  
  
  async function handler(req: FastifyRequest, reply: FastifyReply) {
    const message = {
      ok: "true"
    }
    reply.send(message)
  }
  
  const url = '/auth/register';
  const method: HTTPMethods = "GET"
  export default {
    method,
    url,
    handler
  }