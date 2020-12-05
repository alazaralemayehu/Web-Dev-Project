import { executeQuery } from '../database/database.js';

const addNewReport = async(sleep_duration, sleep_quality, generic_mood) => {
    
    const res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,NOW(),$4)", 'sleep_duration', 'morning', sleep_duration, 2);
    res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,NOW(),$4)", 'sleep_quality', 'morning', sleep_quality, 2);
    res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,NOW(),$4)", 'generic_mood', 'morning', generic_mood, 2);

    return true; 
}


const getNewsItem = async(id) => {
    const res = await executeQuery("SELECT * FROM news WHERE id = $1", id);
    if (!res) {
        return null;
    }

    return res.rowsOfObjects()[0];
}

const deleteNewsItem = async(id) => {
    await executeQuery("DELETE FROM news WHERE id = $1", id);
}

const addNewsItem = async(title, content) => {
    await executeQuery("INSERT INTO news (title, content) VALUES ($1, $2)", title, content);
}

export { getNewsItem, deleteNewsItem, addNewReport };