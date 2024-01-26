
const express= require("express");
const app=express();

const productsRouter = require("./routes/products.router");
const cartsRouter= require("./routes/carts.router");

const PORT= 8080;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

const ProductManager = require("./ProductManager");

const productManager =  new ProductManager ();

const CartManager = require ("./CartManager");


module.exports = ProductManager,productManager, CartManager;


app.listen(PORT, ()=>{
    console.log(`Servidor con express en el puerto ${PORT}`);
})

