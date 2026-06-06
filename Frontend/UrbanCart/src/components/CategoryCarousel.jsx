import React, { useEffect } from "react";
// import "./CategoryCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../redux/thunks/categoryThunks";
// import { getAllCategory } from "../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";


import "./style/categoryShowcase.css";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="category-showcase-section">

        <div className="container">
      <div className="category-showcase-header">
        <span className="category-subtitle">
          LUXURY COLLECTION
        </span>

        <h2 className="category-title">
          Shop By Category
        </h2>
      </div>

      <div className="category-carousel-wrapper">
        {loading ? (
          <div className="category-loading">
            Loading Categories...
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            loop={false}
            speed={1200}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              576: {
                slidesPerView: 2.5,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
          >
            {categories?.map((category) => (
              <SwiperSlide key={category._id}>
                <div
                  className="luxury-category-card"
                  onClick={() =>
                    handleCategoryClick(category.name)
                  }
                >
                  <div className="category-image-wrapper">
                    <img
                      src={category.image?.url}
                      alt={category.name}
                      className="category-image"
                    />


                    {/* <img
  src={
    category?.image?.url ||
    "https://via.placeholder.com/300x300?text=Category"
  }
  alt={category.name}
  className="category-image"
/> */}
                  </div>

                  <h3 className="category-name">
                    {category.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;