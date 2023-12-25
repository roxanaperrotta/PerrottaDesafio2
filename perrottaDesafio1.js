class ProductManager{
    constructor (){
        this.products = []

    }

    getProducts(){

        return this.products
    }

    addProduct(title, description, price, code, thumbnail="imagen no disponible",  stock=10){
        
    // crear el producto nuevo

        const newProduct={
            id: this.products.length + 1,
            title,
            description,
            price, 
            thumbnail, 
            code,
            stock

        }

    // Validación de inputs

        if (typeof title !== 'string' || title.trim() === '') {
            return '!!Atención: Título inválido o faltante';
        }
        if (typeof description !== 'string') {
            return '!!Atención: Descripción inválida';
        }
        if (typeof price !== 'number' || price < 0) {
            return '!!Atención: Precio inválido';
        }
        if (typeof code !== 'string' || code.trim() === '') {
            return '!!Atención: Código inválido o faltante';
        }
        if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
            return '!!Atención: Stock inválido';
        }

 //Revisar que no se dupliquen códigos

        const existingProduct=this.products.find(product=>product.code === code);

        if (existingProduct){
            return `!!Atención: Producto no agregado. El producto con código ${code} ya existe.`
        }

//Agregar al array  
 
        else{
              this.products.push(newProduct)   
              return `Producto con código ${code} agregado`
        }
       
    }

//Obtener producto por id

    getProductById(id){

        return this.products.find(product=>product.id===id)
        
    }

    
}


const productManager = new ProductManager()



//prueba

console.log(productManager.addProduct('sandía', 'fruta', 1500, 'f1111'));
console.log(productManager.addProduct('milanesa', 'carne', 1500, 'c1112'));
console.log(productManager.addProduct('jamón crudo', 'fiambre', 1800, 'fi1113'));

console.log(productManager.addProduct('melón', 'fruta', 700, 'c1112'));
console.log(productManager.addProduct('lechuga'));
console.log(productManager.addProduct('lechuga', 'verdura', 900));

console.log(productManager.addProduct('lechuga', 'verdura', 900, 'v1234'));


console.log('---------------------')

console.log(productManager.getProducts())
console.log(productManager.getProductById(2))

