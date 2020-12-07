import * as landingService from '../../services/LandingService.js';
import  {validate, required, isNumeric,minNumber, maxNumber} from '../../deps.js';

const showSummary = async(context) => {
    console.log("I am here");
    const data = await landingService.getSummary();
    const user = await context.session.get('user');
    context.render('/index.ejs', {data:data, user: user})

}

export {showSummary};