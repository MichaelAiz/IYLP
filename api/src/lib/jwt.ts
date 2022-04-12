import { SignJWT, importJWK, JWK } from 'jose';

import 'dotenv/config'

export default async function sign(user_name: string, user_id: string) {
    const jwt = new SignJWT({ })
        .setProtectedHeader({ alg: 'ES256' })
        .setSubject(`${user_name}/${user_id}`)
    console.log(process.env.PRIVATE_KEY)
    const key = await importJWK(JSON.parse(process.env.PRIVATE_KEY) as unknown as JWK, 'ES256')
    return await jwt.sign(key);
}
