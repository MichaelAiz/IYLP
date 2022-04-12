import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods,

} from 'fastify';

import { Driver} from 'neo4j-driver'
import { randomUUID } from 'crypto'
import verifyJWT from '../auth.js'

export type Post = {
    dateCreated: String
    createdByName: string
    createdByID: string
    category: String
    content: string
}

export interface createPostRequest {
    Body: {
        date: String
        category: String
        content: string
    }
}

const schema = {
    body: {
        type: 'object',
        properties: {
            date: {
                type: 'string'
            },
            category: {
                type: 'string'
            },
            content: {
                type: 'string'
            }
        },
        required: ['date', 'category', 'content']
    }
};


function handler(driver: Driver) {
    return async function (req: FastifyRequest<createPostRequest>, reply: FastifyReply) {
        const session = driver.session()
        try {
            if(!req.headers.authorization) {
                reply.code(401)
                throw new Error('All requests must be authenticated')
            }
            const verifyResult = await verifyJWT(req.headers.authorization)
            const date = req.body.date
            const post_category = req.body.category
            const content = req.body.content
            const post_id = randomUUID()
            console.log(verifyResult.sub.split('/'))
            const [username, user_id] = verifyResult.sub.split('/')

            const result = await session.readTransaction(tx => {
                return tx.run(
                    'CREATE (post:Post {dateCreated: $date, createdByName: $username, createdByID: $user_id, category: $post_category, content: $content, id: $post_id}) RETURN post',
                    { date, username, user_id, post_category, content, post_id }
                )
            })
            reply.send("Success")
        } catch (e) {
            reply.send(e)
        } finally {
            session.close()
        }
    }
}

export default function createPost(driver: Driver) {
    const url = '/createPost';
    const method: HTTPMethods = "POST"
  
    return {
        method,
        url,
        handler: handler(driver)
    }
  }