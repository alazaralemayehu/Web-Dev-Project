let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "localhost",
    database: "postgres",
    user: "postgres",
    password: "root",
    port: 5432
  };
}

export { config }; 

// CREATE TABLE activities
// (
//     id SERIAL PRIMARY KEY, 
//     activity_type VARCHAR NOT NULL,
//     time_of_day VARCHAR NOT NULL,
//     time_spent numeric(100,2),
//     date date,
//     user_id integer,
//     CONSTRAINT activities_user_id_fkey FOREIGN KEY (user_id)
//         REFERENCES users (id) 
// );