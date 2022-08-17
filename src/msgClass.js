
const { options } = require ("../src/options/SQLite3");
const knex = require("knex")(options);


class Contenedor {
  constructor (options, table){
      this.options = options;
      this.table = table;
  }
  //Add object
  
}

//Carga de todos los productos desde la DB
async function listOfMsg() {

  const p = await knex.from("chat")
    .select("*")
    .then((rows) => {
      let prods=Object.values(JSON.parse(JSON.stringify(rows)));
      return prods;
    })
    .catch((err) => {
      console.log(err);
    });

  return p;

}


// Persiste los productos en la BD
function addMsg (msg) {

  knex("chat")
    .insert(msg)
    .then(() => {
      console.log("Mensaje agregado!")
      return msg;
    })
    .catch((err) => {
      console.log(err);
    });

}


module.exports = { listOfMsg, addMsg }