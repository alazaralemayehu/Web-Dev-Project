import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
}

const authMiddleware = async ({session, request, response}, next) => {
    const request_pathname = request.url.pathname;
    if (request_pathname === '/' || request_pathname === '/api') {
        await next();
    } else {
        const authenticated = await session.get('authenticated');
        if (authenticated) {
            await next();
        } else {
            response.status = 401;
        }
        // implemente session check up functionality
    }
} 
const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

export { errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware, authMiddleware };