// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  
  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'lendsqr',
      password : 'password',
      database : 'lendsqr'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + "/migrations",      
    }
  },

  production: {
    client: 'mysql',
    connection: {
      port : 3306,
      host : 'us-cdbr-east-05.cleardb.net',
      user : 'b5b27d137d0d4d',
      password : 'd0f07fba',
      database : 'heroku_a1443916e3a4be2'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + "/migrations",      
    }
  },

};
