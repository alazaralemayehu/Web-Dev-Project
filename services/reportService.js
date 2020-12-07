import { executeQuery } from '../database/database.js';

const addNewReport = async(data) => {
    const {time_of_day, sleep_duration,sleep_quality, generic_mood, exercise_duration, studying_duration, food_quality, date, user_id} = data;

    if (time_of_day == 'morning') {
        const alreadyExists = await executeQuery("SELECT * FROM activities where (date = $1 AND time_of_day =$2)", date, time_of_day);
        console.log(alreadyExists.rows);
        if (alreadyExists.rowCount == 0) {
            let res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'sleep_duration', time_of_day, sleep_duration, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'sleep_quality', time_of_day, sleep_quality, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'generic_mood', time_of_day, generic_mood, date, user_id);
        } else {
            console.log('update ');
            let res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", sleep_duration, date, 'sleep_duration');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", sleep_quality, date, 'sleep_quality');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", generic_mood, date, 'generic_mood');
           
        }           
    } else {
        const alreadyExists = await executeQuery("SELECT * FROM activities where (date = $1 AND time_of_day =$2)", date, time_of_day);
        console.log(alreadyExists);
        if (alreadyExists.rowCount == 0) {
            let res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'exercise_duration', time_of_day, exercise_duration, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'studying_duration', time_of_day, studying_duration, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'food_quality', time_of_day, food_quality, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'generic_mood', time_of_day, generic_mood, date, user_id);
        } else {
            console.log('update ');
            let res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", exercise_duration, date, 'exercise_duration');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", studying_duration, date, 'studying_duration');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", food_quality, date, 'food_quality');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", generic_mood, date, 'generic_mood');
           
        }   
    }
    
  
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