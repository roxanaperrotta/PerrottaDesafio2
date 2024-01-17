const express= require("express")
const app=express()

const PORT= 8080

const cors = require('cors');

app.use(cors());


const ProductManager = require("./ProductManager")

const productManager =  new ProductManager ("./.products.json")

const data= productManager.getProducts()
//console.log(data)


app.get('/',   (req, res)=>{
   
     res.json(data)
     console.log(data)
   
})

app.get('/productId/:productId',  (req, res)=>{
    const idProducto= req.params.productId
    let product= productManager.getProductById()
   // let product=data.find((p) => p.id===idProducto)
    
    console.log(product)
    if (!product) return res.send ({error:"Producto no encontrado"})
    res.json(product)
})

app.get("/productos/:limite", (req, res) =>{
    
    let limite = parseInt(req.query.limite)
    let limitedProducts = [...productManager.getProducts()]
   
    if (isNaN(limite) || limite <= 0) {
        return res.status(400).json({ error: "Parámetro inválido" });
    } else {
        limitedProducts = limitedProducts.slice(0, limite);
        res.send(limitedProducts);
    }
    
}
)

app.listen(PORT, ()=>{
    console.log(`Servidor con express en el puerto ${PORT}`)
})

