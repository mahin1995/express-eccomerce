
const createTablesSafely = knex => tables => {
    const createTables = tables.map(({ name, schema }) => {
      return knex.schema.createTable(name, schema)
    });

    return Promise.all(createTables)
      .catch(e => {
        const dropTables = tables.map(({ name }) => {
          return knex.schema.dropTableIfExists(name);
        });

        return Promise.all(dropTables).then(() => Promise.reject(e));
      });
  }

  exports.up = function(knex, Promise) {
    return createTablesSafely(knex)([
      {
        name: "users",
        schema(usersTable) {
          usersTable.increments("id").unsigned().primary();
          usersTable.string("username");
          usersTable.string("password");
          usersTable.string("email");
          usersTable.string("session");
        },
      },
      {
        name: "cities",
        schema(citesTable) {
            citesTable.increments("id").unsigned().primary();
            citesTable.string("name");
        },
      },
      // rest of tables...
    ]);
  }

exports.down = function(knex) {
    return knex.schema.dropTable('person');
};
