import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods,

} from 'fastify';

import { Driver} from 'neo4j-driver'

import verifyJWT from '../auth.js'
import { Hobby } from './types.js';


function handler(driver: Driver) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        let hobbies: Hobby[] = []
        const session = driver.session()
        try {
            if(!req.headers.authorization) {
                reply.code(401)
                throw new Error('All requests must be authenticated')
            }
            const verifyResult = await verifyJWT(req.headers.authorization)
            const [username, user_id] = verifyResult.sub.split('/')
            const result = await session.readTransaction(tx => {
                return tx.run(
                    'MATCH (user:User {id: $user_id})-[likes]->(hobby) RETURN hobby.name, hobby.id',
                    { user_id }
                )
            })
            if (result) {
                result.records.forEach((record) => {
                    const hobby_name: string = record.get('hobby.name')
                    const id: string = record.get('hobby.id')
                    if (hobby_name && id) {
                        hobbies.push({
                            hobby_name,
                            id
                        })
                    }
                })
            } else {
                throw new Error("No result found")
            }
            reply.send(hobbies)
        } catch (e) {
            reply.send(e)
        } finally {
            session.close()
        }
    }
}

export default function getAllLikedHobbies(driver: Driver) {
    const url = '/getAllLikedHobbies';
    const method: HTTPMethods = "GET"
  
    return {
        method,
        url,
        handler: handler(driver)
    }
  }