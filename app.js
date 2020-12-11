import { router } from "./routes/routes.js";
import * as middleware from './middlewares/middlewares.js';
import { authMiddleware } from './middlewares/AuthMiddleware.js'
import {Application, viewEngine, engineFactory, adapterFactory , Session} from "./deps.js";

const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const session = new Session({framework:'oak'});
await session.init();
app.use(session.use()(session));

app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));

app.use(middleware.errorMiddleware);
app.use(middleware.requestInformationMiddleware);
app.use(middleware.serveStaticFilesMiddleware);
app.use(authMiddleware);

app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
    app.listen({ port: 7777 });
}
  
export default app;
export {app};
