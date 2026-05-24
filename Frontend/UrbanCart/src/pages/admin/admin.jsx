import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllproduct } from '../../redux/thunks/productThunks'



const AdminProfile = () => {
   const dispatch = useDispatch()
   const { products } = useSelector((state) => state.products)
   useEffect(() => {
      dispatch(getAllproduct())
   }, [dispatch])

   const totalProducts = products.length

   const inStockProducts = products.filter((product) => product.stock > 0).length

   const outOfStockProducts = products.filter((product) => product.stock === 0).length

   const lowStockProducts = products.filter((product) => product.stock > 0 &&
      product.stock <= 5
   ).length

   return (
      <>
         <div className='dashboard-page'>

            <h1 className='dashboard-title'>
               Admin Dashboard
            </h1>



            <div className='dashboard-cards'>

               <div className='dashboard-card'>

                  <h3>
                     Total Products
                  </h3>

                  <p>
                     {totalProducts}
                  </p>

               </div>



               <div className='dashboard-card'>

                  <h3>
                     In Stock
                  </h3>

                  <p>
                     {inStockProducts}
                  </p>

               </div>



               <div className='dashboard-card'>

                  <h3>
                     Low Stock
                  </h3>

                  <p>
                     {lowStockProducts}
                  </p>

               </div>



               <div className='dashboard-card'>

                  <h3>
                     Out Of Stock
                  </h3>

                  <p>
                     {outOfStockProducts}
                  </p>

               </div>

            </div>

         </div>

      </>
   )

}

export default AdminProfile