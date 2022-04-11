import {
  FastifyReply,
  FastifyRequest,
  HTTPMethods
} from 'fastify';
import sign from '../lib/jwt.js'

async function handler(req: FastifyRequest, reply: FastifyReply) {
  // find user in neo4j db with email matching
  // check if password is correct using bcrypt
  // if correct, sign jwt, return jwt
  // if wrong password, return error
  const message = {
    ok: "true"
  }
  reply.send(message)
}

const url = '/auth/login';
const method: HTTPMethods = "GET"
export default {
  method,
  url,
  handler
}