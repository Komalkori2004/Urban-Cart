import React from "react"

import {
   FaTruck,
   FaLock,
   FaUndo,
   FaGem
}

   from "react-icons/fa"

import "../home/style/featureBar.css"

function FeatureBar() {

   const features = [

      {
         icon: <FaGem />,

         title: "PREMIUM QUALITY",

         description:
            "Finest ingredients sourced globally"
      },



      {
         icon: <FaLock />,

         title: "SECURE PAYMENT",

         description:
            "100% secure & trusted checkout experience"
      },



      {
         icon: <FaTruck />,

         title: "FAST DELIVERY",

         description:
            "Swift & safe delivery at your doorstep"
      },



      {
         icon: <FaUndo />,

         title: "EASY RETURNS",

         description:
            "Hassle-free returns within 7 days"
      }

   ]



   return (

      <section className="feature-bar-section">

         <div className="container">

            <div className="feature-bar">


               {
                  features.map(
                     (item, index) => (

                        <div
                           key={index}

                           className=
                           "feature-card"
                        >

                           <span
                              className=
                              "feature-icon"
                           >

                              {item.icon}

                           </span>



                           <div
                              className=
                              "feature-content"
                           >

                              <h3>

                                 {item.title}

                              </h3>



                              <p>

                                 {item.description}

                              </p>

                           </div>

                        </div>
                     ))
               }
            </div>

         </div>

      </section>
   )
}

export default FeatureBar