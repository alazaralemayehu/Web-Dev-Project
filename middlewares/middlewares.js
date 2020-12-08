import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestInformationMiddleware = async({ request, session }, next) => {
  const user = await session.get('user');
  console.log(user);
  let user_id = 'anonymous';
  const date = new Date().toLocaleDateString();
  if (user) {
    user_id = user.id;
  } 
  console.log(`${request.method} request is made to ${request.url.pathname} by user of id ${user_id} at ${date}`);
  await next();
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

export { errorMiddleware, requestInformationMiddleware, serveStaticFilesMiddleware };