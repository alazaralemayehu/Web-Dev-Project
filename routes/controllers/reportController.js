import * as reportService from '../../services/reportService.js';
import  {validate, required, isNumeric,minNumber, maxNumber} from '../../deps.js';

const showAddReportForm = async ({render, session}) => {
    console.log('hello');
    const user = (await session.get('user'));
    const current_date = new Date(Date.now());
    console.log(current_date);
    render('./report/add_report.ejs', {user:user, current_date: current_date})
}

const validationRulesForMorning = {
    sleep_duration: [required, isNumeric],
    sleep_quality: [required, isNumeric],
    generic_mood: [required, isNumeric]
};

const validationRulesForEvening = {
    exercise_duration: [required, isNumeric],
    studying_duration: [required, isNumeric],
    food_quality: [required, isNumeric],
    generic_mood: [required, isNumeric]
};
const addReport = async ({render, request, response, session}) => {
    const user = (await session.get('user'));
    const user_id = user.id
    const data = {
        sleep_duration: null,
        sleep_quality: null,
        generic_mood: null,
        studying_duration: null,
        food_quality: null,
        exercise_duration: null,

        date: null,
        time_of_day: null, 
        user_id: user_id
    };

    const body =  request.body();
    const params = await body.value;

    data.sleep_duration = params.get('sleep_duration');
    data.sleep_quality = params.get('sleep_quality');
    data.generic_mood = params.get('generic_mood');
    data.date = new Date (Date.parse(params.get('date')));
    data.time_of_day = params.get('time_of_day');
    data.studying_duration = params.get('studying_duration')
    data.food_quality = params.get('food_quality');
    data.exercise_duration = params.get('exercise_duration');
    console.log(data);
    let passes = null;
    let errors = null;
    if (data.time_of_day === 'morning') {
        [passes, errors] = await validate(data, validationRulesForMorning);        
    } else { 
        [passes, errors] = await validate(data, validationRulesForEvening);    
    }
    console.log([passes, errors])    

    reportService.addNewReport(data);
    response.redirect('/behavior/summary')
}

export {showAddReportForm, addReport}