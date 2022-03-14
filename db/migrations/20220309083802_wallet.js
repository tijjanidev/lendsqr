exports.up = function(knex) {
    return knex.schema
        .createTable('wallets', function (table) {
        table.increments('id');
        table.integer('user').unsigned().notNullable();
        table.integer('balance').notNullable().defaultTo(0);
        table.timestamps(true,true);

        table.foreign('user').references('id').inTable('users');
        })
        .createTable('transactions', function (table) {
        table.increments('id');
        table.integer('wallet').unsigned().notNullable();
        table.integer('amount').notNullable();
        table.boolean('is_debit').notNullable().defaultTo(false);
        table.boolean('is_credit').notNullable().defaultTo(false);
        table.integer('is_transfer').nullable().defaultTo(null);
        table.timestamps(true,true);

        table.foreign('wallet').references('id').inTable('wallets');
        });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('users');
  };