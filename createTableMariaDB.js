const { options } = require ("./src/options/MariaDB");
const knex = require("knex")(options);

knex.schema.createTable("products", (table)=>{
    table.increments("id")
    table.string("name")
    table.integer("price")
    table.string("thumbnail")
}).then(()=>{
    console.log("Tabla creada ok!");
}).catch((err)=>{
    console.log(`Error al crear la tabla ${err}`);
}).finally(()=>{
    knex.destroy();
})

