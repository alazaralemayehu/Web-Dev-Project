import { executeQuery } from '../database/database.js';

const addNewReport = async(data) => {
    const {time_of_day, sleep_duration,sleep_quality, generic_mood, exercise_duration, studying_duration, food_quality, date, user_id} = data;

    if (time_of_day === 'morning') {
        const alreadyExists = await executeQuery("SELECT * FROM activities where (date = $1 AND time_of_day =$2)", date, time_of_day);
        if (alreadyExists.rowCount === 0) {
            let res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'sleep_duration', time_of_day, sleep_duration, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'sleep_quality', time_of_day, sleep_quality, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'generic_mood', time_of_day, generic_mood, date, user_id);
        } else {
            let res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", sleep_duration, date, 'sleep_duration');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", sleep_quality, date, 'sleep_quality');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", generic_mood, date, 'generic_mood');
           
        }           
    } else {
        const alreadyExists = await executeQuery("SELECT * FROM activities where (date = $1 AND time_of_day =$2)", date, time_of_day);
        if (alreadyExists.rowCount === 0) {
            let res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'exercise_duration', time_of_day, exercise_duration, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'studying_duration', time_of_day, studying_duration, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'food_quality', time_of_day, food_quality, date, user_id);
            res = await executeQuery("INSERT INTO activities (activity_type, time_of_day, time_spent, date, user_id) VALUES ($1,$2,$3,$4,$5)", 'generic_mood', time_of_day, generic_mood, date, user_id);
        } else {
            let res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", exercise_duration, date, 'exercise_duration');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", studying_duration, date, 'studying_duration');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", food_quality, date, 'food_quality');
            res = await executeQuery("UPDATE  activities SET time_spent = $1 WHERE (date = $2 AND activity_type= $3)", generic_mood, date, 'generic_mood');
           
        }   
    }
    
  
    return true; 
}


const isReportSubmitted = async(id) => {
    let morning = false;
    let evening = false;

    let res = await executeQuery("SELECT * FROM activities WHERE (user_id = $1 AND date=CURRENT_DATE AND time_of_day = $2)", id, 'morning');
    if (res && res.rowCount > 0) {
        morning = true;
    }

    const res_evening = await executeQuery("SELECT * FROM activities WHERE (user_id = $1 AND date=CURRENT_DATE AND time_of_day = $2)", id, 'evening');
    if (res_evening && res_evening.rowCount > 0) {
        evening = true;
    }

return [morning, evening]
}



export { addNewReport, isReportSubmitted };