const { options } = require ("../src/options/MariaDB");
const knex = require("knex")(options);

/* class Contenedor {
  constructor (options, table){
      this.options = options;
      this.table = table;
  }
  
  async save(object){
      try {
          if (fs.existsSync(this.file)) {
              const data = await fs.promises.readFile(this.file);
              const array = JSON.parse(data);
              object.id = array.length + 1;
              array.push(object);
              await fs.promises.writeFile(this.file, JSON.stringify(array, null,2));
              console.log('Se ha guardado el objeto con el id: ' + object.id);
          } else {
              object.id = 1;
              await fs.promises.writeFile(this.file, JSON.stringify([object]));
              console.log('Se ha guardado el objeto con el id: ' + object.id);
          }
      } catch (err) {
          throw new Error(err);
      }
  }
} */

//Carga de todos los productos desde la DB
async function listOfProducts() {

  const p = await knex.from("products")
    .select("*")
    .then((rows) => {
      const prods=Object.values(JSON.parse(JSON.stringify(rows)));
      return prods;
    })
    .catch((err) => {
      console.log(err);
    });

  return p;

}


const getProduct = (id) => {
  return (products.find(product => product.id === parseInt(id)) || { error: 'Producto no encontrado' })
}


// Persiste los productos en la BD
function addProduct (prod) {

  knex("products")
    .insert(prod)
    .then(() => {
      console.log("Producto agregado!")
      return prod;
    })
    .catch((err) => {
      console.log(err);
    });

}

const updateProduct = (id, newContent) => {
  const product = getProduct(parseInt(id))
  if ((product.id == id) && (product.id != null)) {
    product.name = newContent.name
    product.price = newContent.price
    product.thumbnail = newContent.thumbnail
    return product
  } else {
    return 'Producto no encontrado'
  }
}

function deleteProduct(idProducto) {
  knex("products")
  .where({ id: idProducto })
  .del()
    .then(() => {
      console.log("Producto eliminaro!")
      return idProducto;
    })
    .catch((err) => {
      console.log(err);
    });
   
}

module.exports = { listOfProducts, getProduct, addProduct, updateProduct, deleteProduct }