import { getUser, addNewUser } from "../../services/userService.js";


const login = async({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    // check if the email exists in the database
    const userObj = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (userObj === null) {
        response.status = 401;
        return;
    }

    // take the first row from the results
    const hash = userObj.password;

    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        respnse.status = 401;
        return;
    }


    await session.set('authenticated', true);
    await session.set('user', {
        id: userObj.id
    });
    response.body = 'Authentication successful!';
}

const logout = async ({session}) => {
    await session.set('authenticated', false);
    await session.set('user', null);

    response.body = 'Logged out';
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

export {login, logout, registerUser}


