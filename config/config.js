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