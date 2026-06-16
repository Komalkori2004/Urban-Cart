import React from 'react'

import Hero from '../home/hero'
import FeatureBar from '../home/FeatureBar'
import FeatureProduct from '../home/featureProduct'
import CategoryCarousel from '../components/CategoryCarousel'

import OfferBanner from '../home/OfferBanner'
import NewArrivals from '../home/NewArrivals'

import BrandStory from '../home/BrandStory'
import Testimonials from '../home/testimonials'
import CollectionShowcase from '../home/collectionshow'
function HomePage() {
  return (
    <>
    <Hero/>
     <FeatureBar/>
    <CategoryCarousel/>
        <FeatureProduct/>
    <OfferBanner/>
       <BrandStory/>
      <Testimonials/>
      <CollectionShowcase/>

      {/* <NewArrivals/> */}
    
    </>
  )
}

export default HomePage