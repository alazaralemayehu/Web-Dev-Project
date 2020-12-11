# introduction
This project is made for web software development course.

## Setup

1. Open postgres database and run the following sql command in the sql:
```
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password CHAR(60) NOT NULL
    );

    CREATE UNIQUE INDEX ON users((lower(email)));


    CREATE TABLE activities
    (
        id SERIAL PRIMARY KEY, 
        activity_type VARCHAR NOT NULL,
        time_of_day VARCHAR NOT NULL,
        time_spent numeric(100,2),
        date date,
        user_id integer,
        CONSTRAINT activities_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES users (id) 
    );

```

2. After creating necessary table and indices, setup up your database in eithe of the following way:

    2.1. create a database object like the following

        hostname: "<hostname>",
        database: "<postgrse>",
        user: "<user name for you database>",
        password: "<password for the database>",
        port: <port for the database>
    
    and assign the above object to config.database object inside config.js file
    
    2.2. define DATABASE_URL in the environment variable and run the application using the step 3

    2.3. set the following variables in environment variable (on windows)

        * PGPORT - port on which PostgreSQL is running on.
        * PGDATABASE - database name.
        * PGHOST - database host (hostname).
        * PGUSER - database username.
        * PGPASSWORD - database password.

3. if you chose either 2.1 or 2.2 or 2.3 to setup your database:
    
    run the following command: your working directory should be the same as app.js
    
    ```
        deno run --allow-all --unstable app.js
    ```

    if you don't want to chose any of the above to setup your database (only in linux)

    ```
        $ PGPORT=ur_port PGDATABASE=my_db PGHOST=your_host PGUSER=your_pg_user PGPASSWORD=your_password deno run --allow-all --unstable app.js
    ``` 

4. to run the test, run the following command: your working directory should be the same as app.js
```
    deno test --allow-all --unstable
```

5. You can find the working application in the https://deno-final-project-alazar.herokuapp.com

