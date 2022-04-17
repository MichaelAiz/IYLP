import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods,

} from 'fastify';

import { Driver } from 'neo4j-driver'
import { randomUUID } from 'crypto'
import verifyJWT from '../auth.js'


export interface hobbyLikeRequest {
    Body: {
        hobby_id: string
    }
}

const schema = {
    body: {
        type: 'object',
        properties: {
            hobby_id: {
                type: 'string'
            }
        },
        required: ['hobby_id']
    }
};

function handler(driver: Driver) {
    return async function (req: FastifyRequest<hobbyLikeRequest>, reply: FastifyReply) {
        const session = driver.session()
        try {
            if (!req.headers.authorization) {
                reply.code(401)
                throw new Error('All requests must be authenticated')
            }
            const verifyResult = await verifyJWT(req.headers.authorization)
            const hobby_id = req.body.hobby_id
            console.log(verifyResult.sub.split('/'))
            const [username, user_id] = verifyResult.sub.split('/')

            const result = await session.readTransaction(tx => {
                const query = "MATCH (hobby: Hobby {id: $hobby_id}), (user:User {id: $user_id}) CREATE (user)-[r:likes]->(hobby)"
                return tx.run(
                    query,
                    { hobby_id, user_id }
                )
            })
            session.close()
            return reply.send({result: "SUCCESS", payload: ""})
        } catch (e) {
            session.close()
            return reply.send({result: "FAILURE", payload: e.message})
        } finally {
            session.close()
        }
    }
}

export default function likeHobby(driver: Driver) {
    const url = '/api/likeHobby';
    const method: HTTPMethods = "POST"

    return {
        method,
        url,
        schema,
        handler: handler(driver)
    }
}