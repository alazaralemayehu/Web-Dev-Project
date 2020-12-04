import { Application } from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from './middlewares/middlewares.js';
import { viewEngine, engineFactory, adapterFactory , Session} from "./deps.js";

const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const session = new Session({framework:'oak'});
await session.init();
app.use(session.use()(session));

app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));

app.use(middleware.authMiddleware);
app.use(middleware.errorMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.serveStaticFilesMiddleware);

app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
    app.listen({ port: 7777 });
  }
  
  export default app;

//   const authenticate = async({request, response, session}) => {
//     const body = request.body();
//     const params = await body.value;
  
//     const email = params.get('email');
//     const password = params.get('password');
  
//     // check if the email exists in the database
//     const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
//     if (res.rowCount === 0) {
//         response.status = 401;
//         return;
//     }
  
//     // take the first row from the results
//     const userObj = res.rowsOfObjects()[0];
  
//     const hash = userObj.password;
  
//     const passwordCorrect = await bcrypt.compare(password, hash);
//     if (!passwordCorrect) {
//         respnse.status = 401;
//         return;
//     }
  
//     // retrieve the roles for the authenticated user
//     const rolesRes = await executeQuery(`SELECT name FROM roles 
//                                               JOIN user_roles ON roles.id = user_roles.role_id
//                                               WHERE user_roles.user_id = $1;`, userObj.id);
  
//     await session.set('authenticated', true);
//     await session.set('user', {
//         id: userObj.id,
//         email: userObj.email,
//         roles: rolesRes.rows.flatMap(x => x)
//     });
//     response.body = 'Authentication successful!';
//   }