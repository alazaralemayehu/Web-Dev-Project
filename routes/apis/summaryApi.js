import * as summaryService from '../../services/summaryService.js';

const getWeeklyAPIReport = async({response}) => {
    const summary = await summaryService.getWeeklySummaryUnfiltered();

    response.body = summary;
}

const getDailyAPISummary = async({params, response}) => {
    // /api/summary/:year/:month/:day
    const summary =  await summaryService.getDailySummary(params.year, params.month, params.day);
    response.body = summary;
}
export {getWeeklyAPIReport, getDailyAPISummary};