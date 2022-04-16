import {
    FastifyReply,
    FastifyRequest,
    HTTPMethods,

} from 'fastify';

import { Driver} from 'neo4j-driver'

import verifyJWT from '../auth.js'


function handler(driver: Driver) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        const session = driver.session()
        try {
            if(!req.headers.authorization) {
                reply.code(401)
                throw new Error('All requests must be authenticated')
            }
            const verifyResult = await verifyJWT(req.headers.authorization)
            console.log('verfied')
            reply.send(verifyResult)
        } catch (e) {
            reply.send(e)
        } finally {
            session.close()
        }
    }
}

export default function introspect(driver: Driver) {
    const url = '/api/introspect';
    const method: HTTPMethods = "GET"
  
    return {
        method,
        url,
        handler: handler(driver)
    }
  }