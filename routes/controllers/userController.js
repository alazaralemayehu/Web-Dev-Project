import { getUser, addNewUser } from "../../services/userService.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";


const login = async({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    // check if the email exists in the database
    const userObj = await getUser(email);
    if (userObj === null) {
        response.status = 401;
        return;
    }

    // take the first row from the results
    const hash = userObj.password;

    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        response.body = 'User name or password is incorrect'
        respnse.status = 401;
        return;
    }

    console.log(userObj);
    await session.set('authenticated', true);
    await session.set('user', {
        id: userObj.id,
        email: userObj.email
    });
    response.redirect ('/behavior/summary')
}

const logout = async ({session, response}) => {
    console.log("Logging out");
    await session.set('authenticated', false);
    await session.set('user', null);

    response.redirect('/');
}

const registerUser = async ({request, response, session}) => {
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');
  
    // here, we would validate the data, e.g. checking that the 
    // email really is an email
  
    if (password !== verification) {
      response.body = 'The entered passwords did not match';
    } else {
        const userExists = await getUser(email);
        if (userExists !== null) {
            response.body = 'Account with this email already exists';
        } else {
            await addNewUser(email, password);
            response.body = 'User succesfully created'; 
        }
    }
}

const showLoginPage = async({render, session}) => {
    const user = await session.get('user')
    render('/auth/login.ejs', {user: user});
}

const showRegistrationPage = async({render, session}) => {
    const user = await session.get('user');
    render('/auth/register.ejs',{ user: user});
}

export {login, showLoginPage, logout, registerUser,showRegistrationPage}


