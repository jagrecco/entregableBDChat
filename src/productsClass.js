
const { options } = require ("../src/options/MariaDB");
const knex = require("knex")(options);


let prods=[];

class Contenedor {
  constructor (options, table){
      this.options = options;
      this.table = table;
  }
  //Add object
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
}
/* let contenedor = new Contenedor('./public/products.json'); */

async function listOfProducts() {

  const p = await knex.from("products")
    .select("*")
    .then((rows) => {
      /* console.log(prods) */
      let prods=Object.values(JSON.parse(JSON.stringify(rows)));
      return prods;
    })
    .catch((err) => {
      console.log(err);
    });

  return p;

}

/* const listOfProducts = () => {

  let prods=[]

  knex.from("products")
    .select("*")
    .then((rows) => {
      console.log(prods)
      return filas=Object.values(JSON.parse(JSON.stringify(rows)));
    })
    .catch((err) => {
      console.log(err);
    });
  
  return prods;

} */

const getProduct = (id) => {
  return (products.find(product => product.id === parseInt(id)) || { error: 'Producto no encontrado' })
}

const addProduct = (product) => {
  const prod = {
    name: product.name,
    price: product.price,
    thumbnail: product.thumbnail
  }
  contenedor.save(prod)
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

const deleteProduct = (id) => {
  const product = getProduct(parseInt(id))
  if ((product.id == id) && (product.id != null)) {
    products.splice(products.indexOf(product), 1)
    return 'Producto eliminado'
  } else {
    return 'Producto no encontrado'
  }
}

module.exports = { listOfProducts, getProduct, addProduct, updateProduct, deleteProduct }