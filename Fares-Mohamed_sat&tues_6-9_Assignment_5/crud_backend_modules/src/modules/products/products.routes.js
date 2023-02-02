import express from 'express'
import { addProduct, allProducts, deleteProduct, updateProduct } from './conroller/products.conroller.js'
const router = express.Router()


router.get("/", allProducts)

router.post("/products", addProduct)

router.delete("/products/:id", deleteProduct)

router.put("/products", updateProduct)



export default router