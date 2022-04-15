import {
  FastifyReply,
  FastifyRequest,
  HTTPMethods,

} from 'fastify';

import bcrypt from 'bcrypt'
import sign from '../lib/jwt.js'
import { Driver } from 'neo4j-driver'

export interface loginRequest {
  Body: {
    email: string,
    password: string
  }
}

const schema = {
  body: {
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
      const { email, password } = req.body
      console.log("HELLO")
      let username = ""
      let userId = ""
      let hashedPassword = ""
      try {
          const result = await session.readTransaction( tx => {
              return tx.run(
                  'MATCH (user:User {email: $email}) RETURN user.username, user.id, user.password',
                  {email}
              )
          })
          if (result) {
            username = result.records[0].get('user.username')
            userId = result.records[0].get('user.id')
            hashedPassword = result.records[0].get('user.password')
          } else {
            throw new Error("No user found")
          }
      } catch(e) {
          reply.send({result: "FAILURE", payload: e.message})
      } finally {
          session.close()
      }
      if (await bcrypt.compare(password, hashedPassword)){
        const jwt = await sign(username, userId)
        return reply.send({result: "SUCCESS", payload: jwt})
      } else {
        return reply.send({result: "FAILURE", payload: "Wrong Password"})
      }
  }
}

export default function login(driver: Driver) {
  const url = '/login';
  const method: HTTPMethods = "POST"

  return {
      method,
      url,
      schema,
      handler: handler(driver)
  }
}