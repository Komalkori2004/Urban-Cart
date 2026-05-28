import React from 'react'

import Hero from '../home/hero'
import FeatureBar from '../home/FeatureBar'
import FeatureProduct from '../home/featureProduct'
import CategoryCarousel from '../components/CategoryCarousel'


function HomePage() {
  return (
    <>
    <Hero/>
    <CategoryCarousel/>
        <FeatureProduct/>
    <FeatureBar/>

    
    
    </>
  )
}

export default HomePage