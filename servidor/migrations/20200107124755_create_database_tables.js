exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("rol", function(table) {
      table.increments("id");
      table.string("tipoRol").unique();
   })

    .createTable("menu", function(table) {
      table.increments("id");
      table.string("plato");
      table.integer("valor");
    })

    .createTable("pedido", function(table) {
      table.increments("id");
      table
        .integer("platoId")
        .references("id")
        .inTable("menu");
      table.string("descripcion");
      table.string("cantidad");
    })

    .createTable("persona", function(table) {
      table.increments("id");
      table
        .integer("tipoRolId")
        .references("id")
        .inTable("rol");
      table.string("nombre");
      table.string("correo");
      table.string("clave");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("persona")
    .dropTableIfExists("cartilla")
    .dropTableIfExists("tipo_persona");
};
