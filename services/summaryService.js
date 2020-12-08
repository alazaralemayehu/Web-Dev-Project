import { executeQuery } from '../database/database.js';


const getSummary = async(user_id) => {
    const data  = {
        weekly_summary : [],
        monthly_summary : []
    }
    const res_monthly = await executeQuery(`
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '30 DAYS' and now()) AND activity_type ='sleep_duration' AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '30 DAYS' and now()) AND activity_type ='sleep_quality'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '30 DAYS' and now()) AND activity_type ='exercise_duration'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '30 DAYS' and now()) AND activity_type ='studying_duration'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '30 DAYS' and now()) AND activity_type ='food_quality'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '30 DAYS' and now()) AND activity_type ='generic_mood'  AND user_id = $1) group by activity_type;
    `, user_id);

    const res_weekly = await executeQuery(`
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='sleep_duration'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='sleep_quality'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='exercise_duration'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='studying_duration'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='food_quality'  AND user_id = $1) group by activity_type union
        SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='generic_mood'  AND user_id = $1) group by activity_type;
`, user_id);

    

    if (res_monthly.rowCount !== 0)  {
        data.monthly_summary = res_monthly.rowsOfObjects();
    }

    if (res_weekly.rowCount !== 0) {
        data.weekly_summary = res_weekly.rowsOfObjects();
    }
  
    console.log(data);
    return data;
}


const getWeeklyFilteredSummary = async (year, week, user_id) => {
    const data  = {
        weekly_summary : [],
    }

    
    const res_week = await executeQuery(`
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('week', date) =$2  AND activity_type ='sleep_duration'  AND user_id = $3) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('week', date) =$2  AND activity_type ='sleep_quality'  AND user_id = $3) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('week', date) =$2  AND activity_type ='exercise_duration'  AND user_id = $3) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('week', date) =$2  AND activity_type ='studying_duration'  AND user_id = $2) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('week', date) =$2  AND activity_type ='food_quality'  AND user_id = $3) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('week', date) =$2  AND activity_type ='generic_mood'  AND user_id = $3) group by activity_type;
`, year, week, user_id );




if (res_week.rowCount !== 0) {
    data.weekly_summary = res_week.rowsOfObjects();
}
return data;
}



const getMonthlyFilteredSummary = async (year, month, user_id) => {
    const data  = {
        monthly_summary : [],
    }

    
    const res_month = await executeQuery(`
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2  AND activity_type ='sleep_duration'  AND user_id = $3) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2  AND activity_type ='sleep_quality'  AND user_id = $3) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2  AND activity_type ='exercise_duration'  AND user_id = $3) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2  AND activity_type ='studying_duration'  AND user_id = $2) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2  AND activity_type ='food_quality'  AND user_id = $3) group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2  AND activity_type ='generic_mood'  AND user_id = $3) group by activity_type;
`, year, month, user_id );




if (res_month.rowCount !== 0) {
    data.monthly_summary = res_month.rowsOfObjects();
}
return data;
}

const getWeeklySummaryUnfiltered = async() => {
    const res_weekly = await executeQuery(`
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='sleep_duration') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='sleep_quality') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='exercise_duration') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='studying_duration') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='food_quality') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE ((date between now() - INTERVAL '7 DAYS' and now()) AND activity_type ='generic_mood') group by activity_type;
`);
 if (res_weekly.rowCount !== 0) {
     return res_weekly.rowsOfObjects();
 } else {
     return [];
 }

};


const getDailySummary = async(year, month, day) => {
    console.log(year, month,day);
    const res_weekly = await executeQuery(`
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2 and date_part('day', date) = $3 AND activity_type ='sleep_duration') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2 and date_part('day', date) = $3 AND activity_type ='sleep_quality') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2 and date_part('day', date) = $3 AND activity_type ='exercise_duration') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2 and date_part('day', date) = $3 AND activity_type ='studying_duration') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2 and date_part('day', date) = $3 AND activity_type ='food_quality') group by activity_type union
    SELECT activity_type, ROUND(AVG(time_spent),2) FROM activities WHERE (date_part('year', date)=$1 and date_part('month', date) =$2 and date_part('day', date) = $3 AND activity_type ='generic_mood') group by activity_type;
`, year, month, day);
 if (res_weekly.rowCount !== 0) {
     return res_weekly.rowsOfObjects();
 } else {
     return [];
 }

};

export {getSummary, getWeeklyFilteredSummary, getMonthlyFilteredSummary, getWeeklySummaryUnfiltered, getDailySummary};