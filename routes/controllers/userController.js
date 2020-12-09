import { getUser, addNewUser } from "../../services/userService.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import  {validate, required, minLength,isEmail} from '../../deps.js';

const login = async({request, response, session, render}) => {
    const body = request.body();
    const params = await body.value;
    let errors = []
    const email = params.get('email');
    const password = params.get('password');

    // check if the email exists in the database
    const userObj = await getUser(email);
    if (userObj === null) {
        response.status = 401;
        const user = await session.get('user')

        errors.InvalidUsernamePassword =  {InvalidUsernamePassword:'Invalid username or password'};
        render('/auth/login.ejs', {errors: errors, user: user});
        return;

        return;
    }

    // take the first row from the results
    const hash = userObj.password;
    
    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        const user = await session.get('user')

        errors.InvalidUsernamePassword =  {InvalidUsernamePassword:'Invalid username or password'};
        response.status = 401;
        render('/auth/login.ejs', {errors: errors, user: user});
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

const registerUser = async ({request, response, render, session}) => {

    const validationRules = {
        password: [required, minLength(4)],
        email: [required, isEmail],
        verification: [required]
    };

    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');
    const user = await session.get('user');

    const data = {
        user: user,
        email: email,
        password: password,
        verification: verification, 
        errors: []
    };

    let [passes, errors] = await validate(data, validationRules);
    // here, we would validate the data, e.g. checking that the 
    // email really is an email
        console.log(errors);
  
    if (password !== verification) {
        passes = false;
        errors.passwordMismatch= {passwordMismatch: 'The passwords do not match.'};
    } 
    
    const userExists = await getUser(email);
    if (userExists) {
        errors.duplicateEmail= {duplicateEmail: 'The Email address already exists.'};
        passes = false;
    }
  
    if (!passes) {
        data.errors = errors;
        render('/auth/register.ejs',{data, user:user, email: data.email, errors: data.errors});   
    } else {
        await addNewUser(email, password);
        await session.set('authenticated', true);
        await session.set('user', {
            id: userExists.id,
            email: userExists.email
        });
        response.redirect('/behavior/reporting'); 
    }
}

const showLoginPage = async({render, session}) => {
    const user = await session.get('user')
    render('/auth/login.ejs', {user: user, errors:''});
}

const showRegistrationPage = async({render, session}) => {
    const user = await session.get('user');

    const data = {
        email: "",
        user: user,
        errors: null
    };
    render('/auth/register.ejs', {data, user:user, email: "", errors: null});
}

export {login, showLoginPage, logout, registerUser,showRegistrationPage}


