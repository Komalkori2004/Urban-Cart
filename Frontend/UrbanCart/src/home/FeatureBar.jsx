import React from "react"

import {
FaTruck,
FaLock,
FaUndo,
FaGem
}
from "react-icons/fa"



function FeatureBar(){

   const features = [

      {
         icon:<FaGem />,
         title:"Premium Quality"
      },

      {
         icon:<FaLock />,
         title:"Secure Payment"
      },

      {
         icon:<FaTruck />,
         title:"Fast Delivery"
      },

      {
         icon:<FaUndo />,
         title:"Easy Returns"
      }

   ]



   return(

      <section
      className="feature-bar">

         {
            features.map(
            (item,index)=>(

               <div
               key={index}

               className=
               "feature-card"
               >

                  <span>

                     {item.icon}

                  </span>

                  <p>

                     {item.title}

                  </p>

               </div>
            ))
         }

      </section>
   )
}

export default FeatureBar