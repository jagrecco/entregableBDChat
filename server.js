const express = require("express");
const router = require("./routes/index");

const productsClass=require("./src/productsClass");
const msgClass=require("./src/msgClass");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

/* const p = require("./public/prod2.json") */
/* const productos = p; */

const port= process.env.PORT || 8080;
const mensajes = [];
app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router);

/* const productos=productsClass.listOfProducts() */

app.set('views', './public');
app.set('view engine', 'ejs');

app.set('json spaces', 2)

//middleware

/* app.get("/", (req, res) => {

  res.render('index', {productos});
});

app.get('/productos', (req, res) => {

  res.json(productos)

})

app.post('/productos', (req, res) => {
  productos.push(req.body)

}) */

httpServer.listen(port, () => console.log(`SERVER ON: Puerto ${port}`)); 

// Servidor
io.on("connection", async (socket) => {

  const productos = await(productsClass.listOfProducts())

  const msj= await(msgClass.listOfMsg())

  console.log("¡Nuevo cliente conectado!");

  socket.emit("mensajes", msj);

  socket.emit("productos", productos);

  socket.on("mensaje", async (data) => {

    msgClass.addMsg (data);
    
    const mensajes = await(msgClass.listOfMsg())

    io.sockets.emit("mensajes", mensajes);
  });

  socket.on("producto", async (prod) => {

    if (prod.id) {

      productsClass.deleteProduct(prod.id)

    } else {

      productsClass.addProduct (prod);

    }

    const productos = await(productsClass.listOfProducts())
        
    io.sockets.emit("productos", productos);

  });

});
