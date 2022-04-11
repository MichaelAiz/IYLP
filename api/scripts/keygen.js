import fs from 'fs';
import path from 'path';
import { generateKeyPair, exportJWK } from 'jose';

console.log('Generating ES256 keypair');
const { publicKey, privateKey } = await generateKeyPair('ES256');

const privateJwk = await exportJWK(privateKey);
const publicJwk = await exportJWK(publicKey);

if(!fs.existsSync(path.resolve('.env'))){
  fs.writeFileSync(path.resolve('.env'), '');
}

fs.appendFileSync(
  path.resolve('.env'),
  `\nPRIVATE_KEY=${JSON.stringify(privateJwk)}`,
);

fs.appendFileSync(
  path.resolve('.env'),
  `\nPUBLIC_KEY=${JSON.stringify(publicJwk)}`,
);

console.log('\t✅ Successfully appended keys to your api/.env file');