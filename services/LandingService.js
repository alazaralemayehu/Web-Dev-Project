import { executeQuery } from '../database/database.js';


const getSummary = async(user_id) => {
    const data  = {
        weekly_summary : []
    }

    const res_weekly = await executeQuery(`
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '2 DAYS' and now()) AND activity_type ='sleep_duration') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '2 DAYS' and now()) AND activity_type ='sleep_quality') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '2 DAYS' and now()) AND activity_type ='exercise_duration') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '2 DAYS' and now()) AND activity_type ='studying_duration') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '2 DAYS' and now()) AND activity_type ='food_quality') group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '2 DAYS' and now()) AND activity_type ='generic_mood') group by activity_type;
`);

    if (res_weekly.rowCount !== 0) {
        data.weekly_summary = res_weekly.rowsOfObjects();
    }
  
    console.log(data);
    return data;


}

export {getSummary};