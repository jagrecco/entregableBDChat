const express = require("express");
const router = express.Router();

const productsClass=require("../src/productsClass")


router.get("/", async (req, res) => {

    const productos= await(productsClass.listOfProducts())
    
    res.render('../public/index', {productos});
});
  
router.post('/productos', (req, res) => {
    productos.push(req.body)
})

module.exports = router