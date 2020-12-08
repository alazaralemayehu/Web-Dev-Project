import * as summaryService from '../../services/summaryService.js';

const getWeeklyAPIReport = async({response}) => {
    const summary = await summaryService.getWeeklySummaryUnfiltered();
    console.log(summary);
   
}

const getDailyAPISummary = async({params, response}) => {
    // /api/summary/:year/:month/:day
    const summary =  await summaryService.getDailySummary(params.year, params.month, params.day);
    console.log(summary)
    response.body =  JSON.stringify(summary);
}
export {getWeeklyAPIReport, getDailyAPISummary};