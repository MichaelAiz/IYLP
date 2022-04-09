import Fastify from 'fastify';
import login from './login.js'

const fastify = Fastify();

fastify.register(login)

console.log("doing stuff")

const start = async () => {
    try {
        console.log("starting")
        await fastify.listen(3001)
    } catch (err) {
        fastify.log.error(err)
    }
}

start()