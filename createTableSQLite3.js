const { options } = require ("./src/options/SQLite3");
const knex = require("knex")(options);

knex.schema.createTable("chat", (table)=>{
    table.string("mail")
    table.integer("time")
    table.string("message")
}).then(()=>{
    console.log("Tabla creada ok!");
}).catch((err)=>{
    console.log(`Error al crear la tabla ${err}`);
}).finally(()=>{
    knex.destroy();
})
