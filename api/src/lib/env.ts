import {
    str,
    envsafe,
    port,
    url,
    makeValidator,
    invalidEnvError,
    json,
    ValidatorSpec,
    defaultReporterText,
  } from 'envsafe';
  
//   const allowList = makeValidator<string[]>(input => {
//     try {
//       const urls = JSON.parse(input as string) as string[];
//       urls.map(url => new URL(url)); // validate that they are URLs
//       return urls;
//     } catch (e) {
//       throw invalidEnvError('allowList', input);
//     }
//   });
  
  function loadEnv() {
    return envsafe({
      PRIVATE_KEY: json({
        desc: 'The private key for JWT',
      }),
      PUBLIC_KEY: json({
        desc: 'The public key for JWT',
      })
    });
  }
  
  
  /**
   * Step 1 - .env file processing step (dotenv)
   * If NODE_ENV is development...
   *  1. look for a .env.development file
   *  2. look for a .env.local file
   *  3. look for a .env
   * If NODE_ENV is production...
   *  1. look for a .env.production file
   *  2. look fof a .env.local file
   *  3. look for a .env file
   *
   * Step 2, apply envSafe wrapper and return
   * typed object
   */
  export default loadEnv();