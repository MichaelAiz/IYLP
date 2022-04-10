import Fastify from 'fastify';
import login from './api/auth/login.js'

const fastify = Fastify();

fastify.route(login)

// Declare a route
// fastify.get('/', function (request, reply) {
//     reply.send({ hello: 'world' })
//   })

const start = async () => {
    try {
        console.log("starting")
        await fastify.listen(3000, "0.0.0.0")
    } catch (err) {
        fastify.log.error(err)
    }
}

start()