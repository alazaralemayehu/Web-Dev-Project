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
    2.3. set the following variables in environment variable

        * PGPORT - port on which PostgreSQL is running on.
        * PGDATABASE - database name.
        * PGHOST - database host (hostname).
        * PGUSER - database username.
        * PGPASSWORD - database password.

3. 
