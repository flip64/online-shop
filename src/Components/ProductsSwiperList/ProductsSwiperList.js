import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import required modules
import { Navigation } from "swiper";

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import "./ProductsSwiperList.css";

import ProductItem from "../ProductItem/ProductItem";

// اینجا badgeClass و title رو هم از props می‌گیریم
const ProductsSwiperList = ({ title, products, badgeClass }) => {
    console.log(`Products for ${title}:`, products);

    return (
        <div className="swiper-products products">
            {/* نمایش عنوان لیست */}
            {title && <h2 className="product-list-title">{title}</h2>}

            {Array.isArray(products) && products.length > 0 && (
                <Swiper
                    slidesPerView={1.5}
                    spaceBetween={5}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5.5,
                            spaceBetween: 0,
                        },
                    }}
                    rewind={true}
                    navigation
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {products.map(product => (
                        <SwiperSlide key={product.id}>
                            <div
                                className="product-slide price_on"
                                style={{ width: "100%", display: "inline-block" }}
                            >
                                {/* پاس دادن badgeClass به ProductItem */}
                                <ProductItem
                                    product={product}
                                    slider={true}
                                    badgeClass={badgeClass}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default ProductsSwiperList;
