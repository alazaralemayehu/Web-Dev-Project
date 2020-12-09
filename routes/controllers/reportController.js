import * as reportService from '../../services/reportService.js';
import  {validate, required, isNumeric,minNumber, numberBetween} from '../../deps.js';

const showAddReportForm = async ({render, session}) => {
    const user = (await session.get('user'));

    const [morning, evening] = await reportService.isMorningReportSubmitted(user.id);
    const data = {
        sleep_duration: "",
        sleep_quality: "",
        generic_mood: "",
        studying_duration: "",
        food_quality: "",
        exercise_duration: "",
        morning:morning,
        evening: evening,
        date: "",
        time_of_day: "", 
        errors: null, 
    };
    console.log('hello');
    const current_date = new Date(Date.now());
    console.log(current_date);
    render('./report/add_report.ejs', {user:user, data: data, errors:null})
}

const validationRulesForMorning = {
    sleep_duration: [required, isNumeric, numberBetween(0,24)],
    sleep_quality: [required, isNumeric, numberBetween(1,5)],
    generic_mood: [required, isNumeric, numberBetween(1,5)]
};

const validationRulesForEvening = {
    exercise_duration: [required, isNumeric, numberBetween(0,24)],
    studying_duration: [required, isNumeric, numberBetween(0,24)],
    food_quality: [required, isNumeric, numberBetween(1,5)],
    generic_mood: [required, isNumeric, numberBetween(1,5)]
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
        morning:false,
        evening: false,
        date: null,
        time_of_day: null, 
        user_id: user_id, 
        errors: null, 
        user: user
    };

    const body =  request.body();
    const params = await body.value;

    data.sleep_duration = Number(params.get('sleep_duration'));
    data.sleep_quality = Number(params.get('sleep_quality'));
    data.generic_mood = Number(params.get('generic_mood'));
    data.date = new Date (Date.parse(params.get('date')));
    data.time_of_day = params.get('time_of_day');
    data.studying_duration = Number(params.get('studying_duration'));
    data.food_quality = Number(params.get('food_quality'));
    data.exercise_duration = Number(params.get('exercise_duration'));
    console.log(data);
    let passes = null;
    let errors = null;
    if (data.time_of_day === 'morning') {
        [passes, errors] = await validate(data, validationRulesForMorning);        
    } else { 
        [passes, errors] = await validate(data, validationRulesForEvening);    
    }
    console.log([passes, errors])    
    if (!passes) {
        data.errors = errors;
        render('./report/add_report.ejs', { data: data, user : user, errors: errors});
        return;
    }  else{
        reportService.addNewReport(data);
        response.redirect('/behavior/summary')
    }
}

export {showAddReportForm, addReport}