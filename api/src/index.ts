import Fastify from 'fastify';
import { Neo4jError } from 'neo4j-driver-core';
import neo4j from 'neo4j-driver'
import login from './api/login.js'
import register from './api/register.js';
import getAllHobbies from './api/getAllHobbies.js'
import createPost from './api/createPost.js';
import likeHobby from './api/likeHobby.js';
import getAllPosts from './api/getAllPosts.js';
import getAllLikedHobbies from './api/getAllLikedHobbies.js';
import introspect from './api/introspect.js'
import fastifyCors from 'fastify-cors';
import dotenv from 'dotenv'
dotenv.config()

const fastify = Fastify();

fastify.register(fastifyCors, { origin: 'http://localhost:3000' });
console.log(process.env.NEO4J_PASS)
const driver = neo4j.driver(process.env.CONNECTION, neo4j.auth.basic('neo4j', process.env.NEO4J_PASS))

fastify.route(login(driver))
fastify.route(register(driver))
fastify.route(getAllHobbies(driver))
fastify.route(createPost(driver))
fastify.route(likeHobby(driver))
fastify.route(getAllPosts(driver))
fastify.route(getAllLikedHobbies(driver))
fastify.route(introspect(driver))

const start = async () => {
    try {
        console.log("starting")
        await fastify.listen(3001, "0.0.0.0")
    } catch (err) {
        fastify.log.error(err)
    }
}

start()