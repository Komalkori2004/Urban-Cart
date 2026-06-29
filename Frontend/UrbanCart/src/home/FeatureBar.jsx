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
      description: "100% authentic luxury products"
   },

   {
      icon: <FaLock />,
      title: "SECURE PAYMENT",
      description: "Encrypted & trusted checkout"
   },

   {
      icon: <FaTruck />,
      title: "FAST DELIVERY",
      description: "Express shipping worldwide"
   },

   {
      icon: <FaUndo />,
      title: "EASY RETURNS",
      description: "7-day hassle free returns"
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