import query from "../../../../database/connecion.js"

export const allProducts = (req, res)=>{
    query.execute('select * from products', (err,result)=>{
        res.json({messgae:"Succcess", result})
        })
    }

export const addProduct = (req,res)=>{
    let {productName,productPrice,productDescription,productCategory} = req.body
    query.execute(`insert into products (productName,productPrice,productDescription,productCategory)
     values ("${productName}","${productPrice}","${productDescription}","${productCategory}")`, (err,result)=>{
        if(err){
           return res.json({messgae:"Error", err})
        }
        return result.affectedRows ? res.json({messgae:"Succcess", result}) : res.json({messgae:"Error", err})
     })
}

export const deleteProduct = (req,res)=>{
    let {id} = req.params
    query.execute(`delete from products where id = ${id}`, (err,result)=>{
        if(err){
           return res.json({messgae:"Error", err})
        }
        return result.affectedRows ? res.json({messgae:"Succcess", result}) : res.json({messgae:"Error", err})
    })
}

export const updateProduct = (req,res)=>{
    let {id,productName,productPrice,productDescription,productCategory} = req.body
    query.execute(`update products set productName = "${productName}", productPrice = "${productPrice}", productDescription = "${productDescription}", productCategory = "${productCategory}" where id=${id} `, (err,result)=>{
        if(err){
            return res.json({messgae:"Error", err})
        }
        return result.affectedRows ? res.json({messgae:"Succcess", result}) : res.json({messgae:"Error", err})

    })

}
