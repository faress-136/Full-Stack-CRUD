import express from 'express'
import cors from 'cors'
import productRouter from './src/modules/products/products.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use(productRouter)


app.listen(3006, ()=>{
    console.log("Server is running .....");
})