import { Router } from 'express';
import ProductManager from '../productManager.js';

const productsRouter = Router()


// http://localhost:8080/products


productsRouter.get('/', async(req, res)=>{
try {
    const {limit} = req.query;
    const products = await ProductManager.getProducts()

    if(limit){
        const LimitedProducts = products.slice(0, limit)
        return res.json(LimitedProducts) 
    }

    return res.json (products)

} catch (error) {
    console.log(error);
    res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS')
}
})

productsRouter.get('/:pid', async (req, res)=>{
try {
    const {pid} = req.params;
    const products = await ProductManager.getProductById(pid)
    res.json(products)
} catch (error) {
    console.log(error);
    res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO CON ID ${pid}`)
}
})

productsRouter.post('/', async (req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;

        const response = await ProductManager.addProduct({title, description, price, thumbnail, code, stock, status, category})
        res.json (response)
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR AGREGAR PRODUCTO`)
    }
})




productsRouter.put('/:pid', async (req, res)=> {
    const {pid} = req.params;

    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await ProductManager.updateProduct(id, {title, description, price, thumbnail, code, stock, status, category})
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR EDITAR PRODUCTO CON ID ${pid}`)
    }
})


productsRouter.delete('/:pid', async (req, res)=>{
    const {pid} = req.params;
    try {
        await ProductManager.deleteProduct(id)
        res.send('PRODUCTO ELIMINADO EXITOSAMENTE')
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR ELIMINAR PRODUCTO CON ID ${pid}`)
    }
})


export default productsRouter