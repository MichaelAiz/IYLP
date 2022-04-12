import Fastify from 'fastify';
import { Neo4jError } from 'neo4j-driver-core';
import neo4j from 'neo4j-driver'
import login from './api/login.js'
import register from './api/register.js';
import { getHobbies } from './api/hobbies.js'

const fastify = Fastify();

const driver = neo4j.driver('neo4j+s://61728d72.databases.neo4j.io', neo4j.auth.basic('neo4j', 'u-KggzQCAN1s2BqjL1n8XkbcsJfCA5CJc9iHaIvJoyQ'))

fastify.route(login(driver))
fastify.route(register(driver))
fastify.route(getHobbies(driver))

const start = async () => {
    try {
        console.log("starting")
        await fastify.listen(3000, "0.0.0.0")
    } catch (err) {
        fastify.log.error(err)
    }
}

start()