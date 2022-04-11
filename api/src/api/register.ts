import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods,

} from 'fastify';

import bcrypt from 'bcrypt'
import sign from '../lib/jwt.js'
import { Driver } from 'neo4j-driver'
import { randomUUID } from 'crypto'

export type newUser = {
    username: string,
    password: string,
    email: string
}

const schema = {
    body: {
        type: 'object',
        properties: {
            username: {
                type: 'string'
            },
            password: {
                type: 'string'
            },
            email: {
                type: 'string'
            }
        },
        required: ['username', 'password', 'email']
    }
};

function handler(driver: Driver) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        const session = driver.session()
        const saltRounds = 10
        const { username, password, email } = req.body as newUser
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const id = randomUUID()
        try {
            const result = await session.writeTransaction( tx => {
                console.log("creating")
                return tx.run(
                    "CREATE (n:testing) RETURN n",
                )
            })
            console.log(result.records[0].get(0))
        } catch(e) {
            console.log(e)
        } finally {
            session.close()
        }
        console.log("created")
        const jwt = sign(id)
        reply.send(jwt)
    }
}

export default function userRegister(driver: Driver) {
    const url = '/auth/register';
    const method: HTTPMethods = "POST"

    return {
        method,
        url,
        schema,
        handler: handler(driver)
    }
}