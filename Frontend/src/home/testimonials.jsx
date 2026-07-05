import "../home/style/testimonials.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
function Testimonials() {

    const reviews = [
        {
            name: "Priya Sharma",
            image: "/images/user1.avif",
            text: "The craftsmanship and premium packaging exceeded my expectations. Every detail reflects true luxury."
        },

        {
            name: "Rahul Mehta",
            image: "/images/users3.avif",
            text: "Exceptional quality and fast delivery. UrbanCart offers a shopping experience that feels truly premium."
        },

        {
            name: "Ananya Kapoor",
            image: "/images/user2.avif",
            text: "From elegant designs to flawless service, UrbanCart has become my favorite luxury destination."
        },

        {
            name: "Arjun Malhotra",
            image: "/images/user4.avif",
            text: "The attention to detail, authentic products, and premium presentation make every purchase memorable."
        }
    ];

    return (
        <section className="testimonials-section">

            <div className="container">

                <div className="testimonials-header">

                    <span className="testimonials-tag">
                        TESTIMONIALS
                    </span>

                    <h2 className="testimonials-title">
                        What Our Customers Say
                    </h2>

                </div>
                <div className="testimonials-grid">

                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={3}
                        spaceBetween={30}
                        centeredSlides={false}
                        watchOverflow={true}
                        loop={true}
                        speed={1000}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },

                            768: {
                                slidesPerView: 2,
                                spaceBetween: 25,
                            },

                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >

                        {reviews.map((review, index) => (

                            <SwiperSlide key={index}>

                                <div className="testimonial-card">

                                    <div className="testimonial-avatar">

                                        <img
                                            src={review.image}
                                            alt={review.name}
                                        />

                                    </div>

                                    <div className="stars">
                                        ★★★★★
                                    </div>

                                    <p className="testimonial-text">
                                        "{review.text}"
                                    </p>

                                    <div className="testimonial-line"></div>

                                    <h4>
                                        {review.name}
                                    </h4>

                                </div>

                            </SwiperSlide>

                        ))}

                    </Swiper>

                </div>

            </div>

        </section>
    );
}

export default Testimonials;