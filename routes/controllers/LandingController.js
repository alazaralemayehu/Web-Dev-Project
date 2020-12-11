import * as landingService from '../../services/LandingService.js';
import  {validate, required, isNumeric,minNumber, maxNumber} from '../../deps.js';

const showSummary = async(context) => {
    const todayMood = (await landingService.getSingleDayMood(0))[0];
    const yesterdayMood = (await landingService.getSingleDayMood(0))[1];
    let message = 'processing today mood';
    if (todayMood > yesterdayMood) {
        message = 'bright';
    }  else {
        message = 'gloomy';
    }

    const data = await landingService.getSummary();
    const user = await context.session.get('user');
    context.render('/index.ejs', {data:data, user: user, message: message})

}

export {showSummary};