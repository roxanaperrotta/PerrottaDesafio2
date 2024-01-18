
const express= require("express");
const app=express();

const PORT= 8080;

const cors = require('cors');

app.use(cors());


const ProductManager = require("./ProductManager")

const productManager =  new ProductManager ()





app.get('/products',  (req, res)=>{
    const data=  productManager.getProducts() 
   res.json(data)

    //console.log(data)
    
    
    const limit = parseInt(req.query.limit);
  
    const products = limit ? data.slice(0,limit) : data
   
    res.json(products);


        
   
})

app.get('/productId/:productId',  (req, res)=>{
    const productId = req.params.productId;
    const data = productManager.getProducts()
    const product = data.find((p)=>p.id==productId);
 
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
       res.json(product);
    });




app.listen(PORT, ()=>{
    console.log(`Servidor con express en el puerto ${PORT}`)
})

