

import React from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavBar = () => {

    const {items=[]}=useSelector((state)=>state.cart)

    const cartCount=items.reduce((acc,item)=>{
        return acc+item.quantity
    },0)
  return (
   <>
   
   <nav>

    <Link to="/">Home</Link>

    <Link to="/cart">Cart {cartCount}</Link>
   </nav>
   
   
   
   
   </>
  )
}

export default NavBar