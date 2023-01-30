const express = require('express')
const mysql2 = require('mysql2')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())



const query = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "CRUD",
    port: "8889"
})


app.get("/",(req,res)=>{
    query.execute('select * from products', (err,result)=>{
    res.json({messgae:"Succcess", result})
    })
})

app.post("/products",(req,res)=>{
    let {productName,productPrice,productDescription,productCategory} = req.body
    query.execute(`insert into products (productName,productPrice,productDescription,productCategory)
     values ("${productName}","${productPrice}","${productDescription}","${productCategory}")`, (err,result)=>{
        if(err){
           return res.json({messgae:"Error", err})
        }
        return result.affectedRows ? res.json({messgae:"Succcess", result}) : res.json({messgae:"Error", err})
     })
})

app.delete("/products/:id",(req,res)=>{
    let {id} = req.params
    query.execute(`delete from products where id = ${id}`, (err,result)=>{
        if(err){
           return res.json({messgae:"Error", err})
        }
        return result.affectedRows ? res.json({messgae:"Succcess", result}) : res.json({messgae:"Error", err})
    })
})

app.put("/products", (req,res)=>{
    let {id,productName,productPrice,productDescription,productCategory} = req.body
    query.execute(`update products set productName = "${productName}", productPrice = "${productPrice}", productDescription = "${productDescription}", productCategory = "${productCategory}" where id=${id} `, (err,result)=>{
        if(err){
            return res.json({messgae:"Error", err})
        }
        return result.affectedRows ? res.json({messgae:"Succcess", result}) : res.json({messgae:"Error", err})

    })

})

app.listen(3006,()=>{
    console.log("Server is listening ....");
})

