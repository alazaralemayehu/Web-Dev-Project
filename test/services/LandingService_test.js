import { assertEquals , assertMatch, assertNotEquals} from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";
import {authMiddleware} from "../../middlewares/AuthMiddleware.js";
// import { LandingService } from '../../services/LandingService.js';
import {app} from '../../app.js';
import {getUser, addNewUser} from '../../services/userService.js';
