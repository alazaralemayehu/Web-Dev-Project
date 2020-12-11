import { assertEquals , assertMatch, assertNotEquals} from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";
import {authMiddleware} from "../../middlewares/AuthMiddleware.js";
import {app} from '../../app.js';
import {getUser, addNewUser} from '../../services/userService.js';

// Deno.test({
//     name: "getUser function returns null", 
//     async fn() {
//         await testClient.get("/api/summary").expect(200);
//     },
//     sanitizeResources: false,
//     sanitizeOps: false
// });


Deno.test({
    name: "getUser function returns null if user does not exist", 
    async fn() {
        const user = await getUser('NonExistingUser@gmail.com');
        assertEquals(user, null);
    },
    sanitizeResources: false,
    sanitizeOps: false
});



Deno.test({
    name: "addNewUser addes user and getUser function returns non-null if user does not exist", 
    async fn() {
        const email = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const password = `email${Math.floor(Math.random() * 1000000)}@gmail.com`;
        const added = await addNewUser(email, password);
        const user = await getUser(email);
        assertNotEquals(user, null);
    },
    sanitizeResources: false,
    sanitizeOps: false
});


// Deno.test("getUser function returns null if user does not exist", async() => {
//     const user = await getUser('NonExistingUser@gmail.com');
//     assertEquals(user, null);
// }, );
