import { Router } from "../deps.js";
import * as userController from "./controllers/userController.js";
import * as reportController from "./controllers/reportController.js";

const router = new Router();

router.get('/addReport', reportController.showAddReportForm);
router.post('/addReport', reportController.addReport);

// router.get('/api/news', newsApi.getNewsList);
// router.post('/api/news', newsApi.addNewsItem);
// router.get('/api/news/:id', newsApi.getNewsItem);
// router.delete('/api/news/:id', newsApi.deleteNewsItem);

export { router };