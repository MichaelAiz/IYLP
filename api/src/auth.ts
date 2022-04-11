import { jwtVerify, importJWK, JWK } from 'jose';

export default async function verifyJWT(authorizationHeader: string) {
    const key = await importJWK(process.env.PUBLIC_KEY as unknown as JWK, 'ES256')
    const { payload } = await jwtVerify(authorizationHeader, key);
    return payload 
}