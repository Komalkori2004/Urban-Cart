import React from 'react'

import Hero from '../home/hero'
import FeatureBar from '../home/FeatureBar'
import FeatureProduct from '../home/featureProduct'
import CategoryCarousel from '../components/CategoryCarousel'

import OfferBanner from '../home/OfferBanner'
import NewArrivals from '../home/NewArrivals'
function HomePage() {
  return (
    <>
    <Hero/>
    <CategoryCarousel/>
        <FeatureProduct/>
  

    <OfferBanner/>
      <FeatureBar/>
      {/* <NewArrivals/> */}
    
    </>
  )
}

export default HomePage