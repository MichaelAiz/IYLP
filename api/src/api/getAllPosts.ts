import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods,

} from 'fastify';

import { Driver} from 'neo4j-driver'

import verifyJWT from '../auth.js'
import { Post } from './types.js'

export interface allPostsRequest {
    Querystring: {
        hobby_id: string
    }
}


const schema = {
    querystring: {
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
    return async function (req: FastifyRequest<allPostsRequest>, reply: FastifyReply) {
        let posts: Post[] = []
        const session = driver.session()
        try {
            if(!req.headers.authorization) {
                reply.code(401)
                throw new Error('All requests must be authenticated')
            }
            const verifyResult = await verifyJWT(req.headers.authorization)
            const hobby_id = req.query.hobby_id
            const result = await session.readTransaction(tx => {
                return tx.run(
                    'MATCH (hobby:Hobby {id: $hobby_id}) --> (post) RETURN post.dateCreated, post.createdByName, post.title, post.category, post.content, post.createdByID',
                    { hobby_id }
                )
            })
            if (result) {
                result.records.forEach((record) => {
                    const date: string = record.get('post.dateCreated')
                    const createdBy: string = record.get('post.createdByName')
                    const opID = record.get('post.createdByID')
                    const title: string = record.get('post.title')
                    const category = record.get('post.category')
                    const content = record.get('post.content')
                    if (date && createdBy && title && category && content) {
                        posts.push({
                            date,
                            createdBy,
                            opID,
                            title,
                            category,
                            content
                        })
                    }
                })
            } else {
                throw new Error("No result found")
            }
            reply.send({result: "SUCCESS", payload: JSON.stringify(posts)})
        } catch (e) {
            reply.send(e)
        } finally {
            session.close()
        }
    }
}

export default function getAllPosts(driver: Driver) {
    const url = '/api/getAllPosts';
    const method: HTTPMethods = "GET"
  
    return {
        method,
        url,
        schema,
        handler: handler(driver)
    }
  }