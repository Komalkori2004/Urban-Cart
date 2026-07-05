

import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function NewArrivals() {

    const { products } = useSelector(
        state => state.products
    );

    const newProducts =
        products.slice(0, 4);

    return (
        <section className="new-arrivals">

            <div className="container">

                <div className="section-header">

                    <p className="section-subtitle">
                        LATEST COLLECTION
                    </p>

                    <h2 className="section-title">
                        New Arrivals
                    </h2>

                </div>

                <div className="product-container">

                    {newProducts.map(product => (

                        <ProductCard
                            key={product._id}
                            product={product}
                            isWishlisted={false}
                            onWishlist={() => { }}
                            onAddToCart={() => { }}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}

export default NewArrivals;