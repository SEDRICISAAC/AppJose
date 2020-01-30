exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("rol")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("rol").insert([
        { id: 1, tipoRol: "Administrador" },
        { id: 2, tipoRol: "Jugador" }
      ]);
    });
};
