import { executeQuery } from '../database/database.js';


const getSummary = async(user_id) => {
    const data  = {
        weekly_summary : []
    }

    const res_weekly = await executeQuery(`
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='sleep_duration') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='sleep_quality') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='exercise_duration') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='studying_duration') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='food_quality') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='generic_mood') group by activity_type;
`);

    if (res_weekly.rowCount !== 0) {
        data.weekly_summary = res_weekly.rowsOfObjects();
    }
  
    return data;


}

const getSingleDayMood  = async(day) => {
    const res = await executeQuery("select round(avg(time_spent)) from activities where date = CURRENT_DATE - $1 AND activity_type='generic_mood'", day);
    if (res && res.rowCount > 0) {
        return (res.rowsOfObjects()[0]).round;
      }
    return 0;
}


export {getSummary, getSingleDayMood};