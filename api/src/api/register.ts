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
        console.log(session)
        const saltRounds = 10
        const { username, password, email } = req.body as newUser
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const id = randomUUID()
        try {
            const result = await session.writeTransaction( tx => {
                console.log("creating")
                return tx.run(
                    'CREATE (user:User {username: $username, password: $hashedPassword, email: $email, id: $id})',
                    {username, hashedPassword, email, id}
                )
            })
        } catch(e) {
            reply.send({result: 'FAILURE', payload: e.message})
        } finally {
            session.close()
        }
        console.log('hellooo')
        const jwt = await sign(username, id)
        console.log(jwt)
        return reply.send({result: 'SUCCESS', payload: jwt})
    }
}

export default function userRegister(driver: Driver) {
    const url = '/api/register';
    const method: HTTPMethods = "POST"

    return {
        method,
        url,
        schema,
        handler: handler(driver)
    }
}