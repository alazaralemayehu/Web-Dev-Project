import { executeQuery } from '../database/database.js';
import * as bcrypt from '../deps.js';

const getUser = async(email) => {
    const user = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (!user) {
        return null;
    }

    return res.rowsOfObjects()[0];
}

const addNewUser = async (email, password) => {
    const hash = bcrypt.hash(password);
    const user = await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, password);

}

export {getUser, addNewUser};