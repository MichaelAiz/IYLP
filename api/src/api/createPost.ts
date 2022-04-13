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
    title: string
    category: String
    content: string
}

export interface createPostRequest {
    Body: {
        date: String
        title: String
        category: String
        content: String
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
            },
            title: {
                type: 'string'
            }
        },
        required: ['date', 'category', 'title', 'content']
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
            const title = req.body.title
            const content = req.body.content
            const post_id = randomUUID()
            console.log(verifyResult.sub.split('/'))
            const [username, user_id] = verifyResult.sub.split('/')
            const query = `MATCH (user:User {id: $user_id}) CREATE (post:Post {dateCreated: $date, createdByName: $username, createdByID: $user_id, category: $post_category, title: $title, content: $content, id: $post_id}), 
            (user)-[r:created]->(post)`
            

            const result = await session.writeTransaction(tx => {
                return tx.run(
                    query,
                    { date, username, user_id, post_category, title, content, post_id }
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