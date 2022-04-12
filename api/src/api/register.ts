import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods,

} from 'fastify';

import bcrypt from 'bcrypt'
import sign from '../lib/jwt.js'
import { Driver } from 'neo4j-driver'
import { randomUUID } from 'crypto'

export interface newUser {
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
                    'CREATE (user:User {username: $username, password: $hashedPassword, email: $email})',
                    {username, hashedPassword, email, id}
                )
            })
        } catch(e) {
            throw new Error("Email is already taken!")
        } finally {
            session.close()
        }
        console.log("created")
        const jwt = await sign(id)
        console.log(jwt)
        return reply.send(jwt)
    }
}

export default function userRegister(driver: Driver) {
    const url = '/register';
    const method: HTTPMethods = "POST"

    return {
        method,
        url,
        schema,
        handler: handler(driver)
    }
}