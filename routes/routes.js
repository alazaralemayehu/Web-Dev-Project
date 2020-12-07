import { Router } from "../deps.js";
import * as userController from "./controllers/userController.js";
import * as reportController from "./controllers/reportController.js";
import * as summaryController from "./controllers/summaryController.js";
import * as LandingeController from "./controllers/LandingController.js";
const router = new Router();

router.get('/behavior/reporting', reportController.showAddReportForm);
router.post('/addReport', reportController.addReport);

router.get('/behavior/summary', summaryController.showSummary);
router.get('/', LandingeController.showSummary);

router.get('/auth/register', userController.showRegistrationPage);
router.post('/auth/register', userController.registerUser);

router.get('/auth/login', userController.showLoginPage);
router.post('/auth/login', userController.login);

router.get('/auth/logout', userController.logout);


router.post('/filter_weekly_summary', summaryController.showWeeklyFilteredSummary);
router.get('/filter_weekly_summary', summaryController.getWeeklyFilterForm);


router.post('/filter_monthly_summary', summaryController.showMonthlyFilteredSummary);
router.get('/filter_monthly_summary', summaryController.getMonthlyFilterForm);

export { router };