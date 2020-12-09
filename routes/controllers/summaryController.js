import * as summaryService from '../../services/summaryService.js';
import  {validate, required, isNumeric,minNumber, maxNumber} from '../../deps.js';

const showSummary = async(context) => {
    console.log("I am here");

    const user= (await context.session.get('user'));
    
    const user_id = user.id;
    const data = await summaryService.getSummary(user_id);
    context.render('/summary/show_summary.ejs', {data:data, user: user})

}

const  getWeeklyFilterForm = async(context) => {
    const user= (await context.session.get('user'));

    const year  =null; const week = null;
    context.render('/summary/filtered_weekly_summary.ejs', {user:user, week: week, year: year});
}

const showWeeklyFilteredSummary= async(context) => {
    const body =  context.request.body();
    const params = await body.value;
    const user= (await context.session.get('user'));

    const week_input = params.get('week');
    // https://stackoverflow.com/questions/8803151/how-to-get-first-date-and-last-date-of-the-week-from-week-number-and-year
    const splitted_week = week_input.split('-');
    const year = Number(splitted_week[0]);
    let week = (splitted_week[1].split(""));
    week.shift();
    week = Number(week.join(""))
    const data = await summaryService.getWeeklyFilteredSummary(year, week,user.id);
    console.log(data);

    context.render('/summary/filtered_weekly_summary.ejs', {data: data, user: user, week: week, year: year})
}

const getMonthlyFilterForm = async (context) => {
    const user = (await context.session.get('user'));
    const year = null; const month= null;
    context.render ('/summary/filtered_monthly_summary.ejs', {user:user, month: month, year: year}); 
}


const showMonthlyFilteredSummary= async(context) => {
    const body =  context.request.body();
    const params = await body.value;
    const user= (await context.session.get('user'));

    const month_input = params.get('month');
    const splitted_month = month_input.split('-');
    const month = Number(splitted_month[1]);
    const year = Number(splitted_month[0]);

    const data = await summaryService.getMonthlyFilteredSummary(year, month, user.id);
    console.log(month_input);

    context.render('/summary/filtered_monthly_summary.ejs', {data: data, user: user, month: month, year: year})
}




export {showSummary, getWeeklyFilterForm , showWeeklyFilteredSummary, getMonthlyFilterForm, showMonthlyFilteredSummary};