
import { jwtVerify, importJWK, JWK } from 'jose';

export default async function verifyJWT(authorizationHeader: string) {
    const key = await importJWK(JSON.parse(process.env.PUBLIC_KEY) as unknown as JWK, 'ES256')
    const  result  = await jwtVerify(authorizationHeader, key);
    return result.payload
}


