import React from 'react'

export default function Table(props) {
  let {product, prodId, updateId} = props
    // console.log(product.productName);
    // console.log(prodId);
    // console.log(product.id);
  function update(id,flag){
    updateId(id,flag)
  }

    function passId(id){
      prodId(id)
    }
  return (
    <>
        <tbody >
        <tr>
            <td>{product.productName}</td>
            <td>{product.productPrice}</td>
            <td>{product.productCategory}</td>
            <td>{product.productDescription}</td>
            <td><button onClick={()=>update(product.id,true)} className="btn btn-warning">Update</button></td>
            <td><button onClick={()=>passId(product.id)} className="btn btn-danger">Delete</button></td>
        </tr>
        </tbody>

     </>
  )
}
