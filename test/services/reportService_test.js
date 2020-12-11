import { assertEquals , assertMatch, assertNotEquals} from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";
import {authMiddleware} from "../../middlewares/AuthMiddleware.js";
import {app} from '../../app.js';
import {getUser, addNewUser} from '../../services/userService.js';
import { addNewReport,isReportSubmitted } from '../../services/reportService.js';
import { executeQuery } from '../../database/database.js';

const data = {
    sleep_duration: 3,
    sleep_quality: 3,
    generic_mood: 3,
    studying_duration: 3,
    food_quality: 3,
    exercise_duration: 3,
    morning:3,
    evening: 3,
    date: new Date().toISOString().slice(0, 10),
    time_of_day: 'morning', 
    user_id: null, 
};



Deno.test({
    name: "isReportSubmitted return false if report is not submitted for morning", 
    async fn() {
        await executeQuery('delete from activities');

        const email = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const password = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const added = await addNewUser(email, password);
        const user = await getUser(email);
        const user_id = user.id;

        const [morning, evening] = await isReportSubmitted(user_id);

        assertEquals(morning, false);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "isReportSubmitted return false if report is not submitted for evening", 
    async fn() {
        await executeQuery('delete from activities');

        const email = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const password = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const added = await addNewUser(email, password);
        const user = await getUser(email);
        const user_id = user.id;

        const [morning, evening] = await isReportSubmitted(user_id);

        assertEquals(evening, false);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "Adding reports with addNewReport for morning and isReportSubmitted will return true for morning", 
    async fn() {
        // await executeQuery('delete from activities');
        data.time_of_day = 'morning';
        // Adding user to get new user_id
        const email = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const password = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const added = await addNewUser(email, password);
        const user = await getUser(email);
        const user_id = user.id;

        let today = new Date().toISOString().slice(0, 10)

        data.user_id = user_id;
        // getDailySummary
        await addNewReport(data);

        const [morning, evening] = await isReportSubmitted(user_id);
        assertEquals(morning, true);
    },
    sanitizeResources: false,
    sanitizeOps: false
});


Deno.test({
    name: "Adding reports with addNewReport for eveninig and isReportSubmitted will return true for evening", 
    async fn() {
        // await executeQuery('delete from activities');
        data.time_of_day = 'evening';
        console.log(data);
        // Adding user to get new user_id
        const email = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const password = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const added = await addNewUser(email, password);
        const user = await getUser(email);
        const user_id = user.id;

        let today = new Date().toISOString().slice(0, 10)

        data.user_id = user_id;
        // getDailySummary
        await addNewReport(data);

        const [morning, evening] = await isReportSubmitted(user_id);
        console.log(evening)
        assertEquals(evening, true);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

