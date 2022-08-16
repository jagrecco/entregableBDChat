const express = require("express");
const router = express.Router();

const productsClass=require("../src/productsClass")

//const productos=productsClass.listOfProducts()
/* const productos=productsClass.listOfProducts() */

/* console.log(productos) */

//const productos = require("../public/prod2.json")


router.get("/", async (req, res) => {

    let productos= await(productsClass.listOfProducts())
    
    res.render('../public/index', {productos});
});
  
router.get('/productos', async (req, res) => {

    let productos= await(productsClass.listOfProducts())
  
    res.json(productos)
  
})
  
router.post('/productos', (req, res) => {
    productos.push(req.body)
  
})

module.exports = router