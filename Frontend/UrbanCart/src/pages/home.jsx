import React from 'react'
import { lazy, Suspense } from "react";



import Hero from '../home/hero'
import FeatureBar from '../home/FeatureBar'
import FeatureProduct from '../home/featureProduct'
import CategoryCarousel from '../components/CategoryCarousel'

import OfferBanner from '../home/OfferBanner'
import NewArrivals from '../home/NewArrivals'

const BrandStory = lazy(() =>
  import("../home/BrandStory")
);

const Testimonials = lazy(() =>
  import("../home/testimonials")
)
const CollectionShowcase = lazy(() =>
  import("../home/collectionshow")
);
const InstagramGallery = lazy(() =>
  import("../home/InstagramGallery")
);
const NewsletterSection = lazy(() =>
  import("../home/NewsletterSection")
);

const ContactUs = lazy(() =>
  import("../components/ContactUs")
);
function HomePage() {
  return (
    <>
    <Hero/>
     <FeatureBar/>
    <CategoryCarousel/>
        <FeatureProduct/>
    <OfferBanner/>
      <Suspense fallback={null}>
    <BrandStory />
    <Testimonials />
    <CollectionShowcase />
    <InstagramGallery />
    <NewsletterSection />
    <ContactUs />
</Suspense>
      {/* <NewArrivals/> */}
    
    </>
  )
}

export default HomePage