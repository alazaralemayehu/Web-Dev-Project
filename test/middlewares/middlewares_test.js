import { assertEquals , assertMatch} from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";
import {authMiddleware} from "../../middlewares/AuthMiddleware.js";
import {app} from '../../app.js';

Deno.test({
    name: "GET request to /api/summary should return 200", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/summary").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});


Deno.test({
    name: "GET request to /api/summary/{year}/{month}/{day} should return 200", 
    async fn() {
        const testClient = await superoak(app);
        const [year, month, day] = [2026, 12 , 12];
        await testClient.get(`/api/summary/${year}/${month}/${day}`).expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET request to nonexisting  url should return 404", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/nonexisting/page").expect(404);
    },
    sanitizeResources: false,
    sanitizeOps: false
});


