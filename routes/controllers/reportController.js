import * as reportService from '../../services/reportService.js';
import  {validate, required, isNumeric,minNumber, maxNumber} from '../../deps.js';

const showAddReportForm = async ({render}) => {
    console.log('hello');
    render('./report/add_report.ejs')
}

const validationRules = {
    sleep_duration: [required, isNumeric],
    sleep_quality: [required, isNumeric],
    generic_mood: [required, isNumeric]
};
const addReport = async ({render, request, response}) => {
    const data = {
        sleep_duration: null,
        sleep_quality: null,
        generic_mood: null
    }

    const body =  request.body();
    const params = await body.value;

    data.sleep_duration = params.get('sleep_duration');
    data.sleep_quality = params.get('sleep_quality');
    data.generic_mood = params.get('generic_mood');
    console.log(data);
    
    const [passes, errors] = await validate(data, validationRules);
    reportService.addNewReport(data.sleep_duration, data.sleep_quality, data.generic_mood);
}

export {showAddReportForm, addReport}