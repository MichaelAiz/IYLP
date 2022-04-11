import {
  FastifyReply,
  FastifyRequest,
  HTTPMethods,

} from 'fastify';

import bcrypt from 'bcrypt'
import sign from '../lib/jwt.js'
import { Driver } from 'neo4j-driver'
import { randomUUID } from 'crypto'

export type loginRequest = {
  Querystring: {
    email: string,
    password: string
  }
}

const schema = {
  querystring: {
      type: 'object',
      properties: {
          email: {
              type: 'string'
          },
          password: {
            type: 'string'
          }
      },
      required: ['password', 'email']
  }
};

function handler(driver: Driver) {
  return async function (req: FastifyRequest<loginRequest>, reply: FastifyReply) {
      const session = driver.session()
      const { email, password } = req.query
      let userId = ""
      let hashedPassword = ""
      try {
          const result = await session.readTransaction( tx => {
              return tx.run(
                  'MATCH (user:User {email: $email}) RETURN user.user_id, user.password',
                  {email}
              )
          })
          console.log(result.records[0].get(1))
          if (result) {
            userId = result.records[0].get(0)
            hashedPassword = result.records[0].get(1)
          } else {
            throw new Error("No user found")
          }
      } catch(e) {
          throw new Error(e)
      } finally {
          session.close()
      }
      if (await bcrypt.compare(password, hashedPassword)){
        const jwt = await sign(userId)
        return reply.send(jwt)
      } else {
        return reply.send("Password no match")
      }
  }
}

export default function login(driver: Driver) {
  const url = '/auth/login';
  const method: HTTPMethods = "GET"

  return {
      method,
      url,
      schema,
      handler: handler(driver)
  }
}