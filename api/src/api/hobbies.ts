import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods,

} from 'fastify';

import { Driver} from 'neo4j-driver'

import verifyJWT from '../auth.js'

export type Hobby = {
    hobby_name: string
    id: string
    
}

const validateJwt = (async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        if(!req.headers.authorization) {
            reply.code(401)
            throw new Error('All requests must be authenticated')
        }
        const verifyResult = await verifyJWT(req.headers.authorization)
    } catch (e) {
        reply.send(e)
    }
})

function handler(driver: Driver) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        let hobbies: Hobby[] = []
        const session = driver.session()
        try {
            const result = await session.readTransaction(tx => {
                return tx.run(
                    'MATCH (hobby:Hobby) RETURN hobby.name, hobby.id ',
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
                throw new Error("No user found")
            }
            reply.send(hobbies)
        } catch (e) {
            reply.send(e)
        } finally {
            session.close()
        }
    }
}

export function getHobbies(driver: Driver) {
    const url = '/getHobbies';
    const method: HTTPMethods = "GET"
  
    return {
        method,
        url,
        onRequest: validateJwt,
        handler: handler(driver)
    }
  }