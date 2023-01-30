import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Table from '../Table/Table'
import { useRef } from 'react'

export default function Home() {

    let name = useRef(null)
    let price = useRef(null)
    let desc = useRef(null)
    let catg = useRef(null)

let [products, setProducts] = useState([])

let [flag, setFlag] = useState(false)

let [data,setData] = useState({
    productName:"",
    productPrice:"",
    productDescription:"",
    productCategory:""
})
let [sharedId,setSharedId] = useState(null)


async function getData(){
    await axios.request({
        method: "GET",
        url: "http://localhost:3006/"
    }).then((response)=>{
        setProducts(response?.data?.result)
    }).catch(err=>{
        setProducts(err)
    })
    // console.log(products);
}

function addProduct(){
    // console.log(data)
    axios.post('http://localhost:3006/products', data)
    .then(res => {
        getData()
        clearForm()
})

}

function deleteProduct(productId){
    // console.log("From Parent", number)
    axios.delete(`http://localhost:3006/products/${productId}`).then(res => {
        getData()
})
}

function updateProduct(productId,flag){
    // console.log(productId)
    setFlag(flag)
    setSharedId(productId)
    let currentProduct = products.filter((product)=>(product.id == productId))
    // console.log(currentProduct);
    let name_ref = name.current
    name_ref.value = currentProduct[0].productName
    let price_ref = price.current
    price_ref.value = currentProduct[0].productPrice
    let catg_ref = catg.current
    catg_ref.value = currentProduct[0].productCategory
    let desc_ref = desc.current
    desc_ref.value = currentProduct[0].productDescription

    setData({ productName:currentProduct[0].productName,
    productPrice:currentProduct[0].productPrice,
    productDescription:currentProduct[0].productDescription,
    productCategory: currentProduct[0].productCategory})

}

async function updateProductData(){
    let{productName, productPrice, productCategory, productDescription} = data

    let updateProd = {
        id: sharedId,
        productName,
        productPrice,
        productCategory,
        productDescription
    }
    // console.log(updateProd);
    
    await axios.put('http://localhost:3006/products', updateProd).then(res => {
        getData()
})
    setFlag(false)
    clearForm()

}



function getUserData(e){
    let myData = {...data}
    myData[e.target.name] = e.target.value
    setData(myData)
    // console.log(myData);
}

function clearForm(){
    document.getElementById('productName').value = ''
    document.getElementById('productPrice').value = ''
    document.getElementById('productDescription').value = ''
    document.getElementById('productCategory').value = ''
    setData({
    productName:"",
    productPrice:"",
    productDescription:"",
    productCategory:"",
    })
}


useEffect(()=>{
    getData()
    // console.log(data)
    console.log(flag);
},[data,flag])

return (
<>
<div>
    <h1 className='text-center mx-auto mt-4'>Full Stack CRUD Application</h1>
</div>


<div className="w-50 mx-auto my-4">
    <div className="form-group">
        <label htmlFor="productName" className="py-1 fs-5 fw-bold">Product Name</label>
        <input type="text" ref={name} onChange={(e)=>{getUserData(e)}} id="productName" name='productName' className="form-control"/>

        <label htmlFor="productPrice" className="py-1 fs-5 fw-bold">Product Price</label>
        <input type="number" ref={price} onChange={(e)=>{getUserData(e)}} id="productPrice" name='productPrice' className="form-control"/>


        <label htmlFor="productCat" className="py-1 fs-5 fw-bold">Product Category</label>
        <input type="text" ref={catg} onChange={(e)=>{getUserData(e)}} id="productCategory" name='productCategory' className="form-control"/>


        <label htmlFor="productDesc" className="py-1 fs-5 fw-bold ">Product Description</label>
        <input type="text" ref={desc} onChange={(e)=>{getUserData(e)}} id="productDescription" name='productDescription' className="form-control"/>


    </div>
    {flag ? 
        <>
        <button className="btn btn-outline-warning mt-3 d-inline-block me-2" onClick={()=>updateProductData()}  id="updateBtn">Update</button>
        </>
        : 
        <>
        <button className="btn btn-outline-info mt-3 me-2" onClick={()=>{addProduct()}} id="mainBtn">Add Product</button>
        </>}
    <button className="btn btn-outline-danger mt-3 ms-1" onClick={()=>{clearForm()}} id="clearForm">Clear Form</button>

</div>


<div className="w-50 mx-auto">
<table className="table">
    <thead>
        <tr className='fs-5'>
            {/* <th>index</th> */}
            <th>Product Name</th> 
            <th>Price</th> 
            <th>Category</th> 
            <th>Description</th> 
            <th>Update</th>
            <th>Delete</th>
        </tr>
    </thead>
    {products?.map((product,id)=>(<Table key={id}  product={product} prodId = {deleteProduct} updateId = {updateProduct}/>))}
    
</table>
</div>
</>
)
}
