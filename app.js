
const express= require("express");
const app=express();



const PORT= 8080;

const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const ProductManager = require("./ProductManager")

const productManager =  new ProductManager ()





app.get('/products',  async (req, res)=>{
    const data=  await productManager.getProducts() 
    
    const limite = parseInt(req.query.limit);
  
    const products = limite ? data.slice(0,limite) : data
   
      res.json(products);
   


        
   
})

app.get('/productId/:productId',  async (req, res)=>{
    const productId = req.params.productId;
    const data = await productManager.getProducts()
    const product = data.find((p)=>p.id==productId);
 
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
     res.json(product);
    });




app.listen(PORT, ()=>{
    console.log(`Servidor con express en el puerto ${PORT}`)
})

