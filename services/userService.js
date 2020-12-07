import { executeQuery } from '../database/database.js';
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";


const getUser = async(email) => {
    const user = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (user.rowCount === 0) {
        return null;
    }

    return user.rowsOfObjects()[0];
}

const addNewUser = async (email, password) => {
    const hash =  await bcrypt.hash(password);
    const user = await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);

}

export {getUser, addNewUser};