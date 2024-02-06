
import express from "express";
const app=express();
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "../Perrotta_PreEntrega1/routes/viewsRouter.js";
import cors from 'cors';
import {Server} from "socket.io";
import handlebars from 'express-handlebars';
import {fileURLToPath} from "url";
import {dirname} from "path";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";

const productManager =  new ProductManager ();




const PORT= 8080;


const __fileName =  fileURLToPath (import.meta.url);
const __dirnombre = dirname(__fileName);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join (__dirnombre, '/public')));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);



//Configuración para handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", __dirnombre + '/views');
app.set ("view engine", "handlebars")


app.use ('/', viewsRouter);
app.use ('/realtimeproducts', viewsRouter)


const httpServer = app.listen(PORT, () =>  console.log (`Server running on PORT ${PORT}`));

//Conexión con socket.io

const socketServer = new Server (httpServer)


socketServer.on("connection" , socket =>{
    console.log ("Nueva conexión");
    socket.on("mensaje", data =>{
       console.log("mensaje", data)
    })


    try {
        const products = productManager.getProducts();
        socketServer.emit("products", products);
    } catch (error) {
        socketServer.emit('response', { status: 'error', message: error.message });
    }
    
   socket.on("new-Product", async (newProduct) => {
        try {
            const productoNuevo = {
                    title: newProduct.title,
                    description: newProduct.description,
                    code: newProduct.code,
                    price: newProduct.price,
                    stock: newProduct.stock,
                    thumbnail: newProduct.thumbnail,
    
            }
            const pushProduct = await productManager.addProduct(productoNuevo);
            const listaActualizada = await productManager.getProducts();
            socketServer.emit("productos", listaActualizada);
            socketServer.emit("response", { status: 'success' , message: pushProduct});

        } catch (error) {
            socketServer.emit('response', { status: 'error', message: error.message });
        }
    })

    socket.on("delete-product", async(id) => {
        try {
            const pid = parseInt(id)
            const deleteProduct = await productManager.deleteProduct(pid)
            const listaActualizada = await productManager.getProducts()
            socketServer.emit("productos", listaActualizada)
            socketServer.emit('response', { status: 'success' , message: "producto eliminado correctamente"});
        } catch (error) {
            socketServer.emit('response', { status: 'error', message: error.message });
        }
    } )

})


export default ProductManager



