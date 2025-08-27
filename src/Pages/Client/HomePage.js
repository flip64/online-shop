import React, { useEffect, useState } from "react";
import { Space } from 'antd';
import SlideShow from '../../Components/SlideShow/SlideShow';
import ProductsSwiperList from '../../Components/ProductsSwiperList/ProductsSwiperList';

const HomePage = () => {
    const BASE_URL = "https://backend.bazbia.ir/api";
    const [products, setProducts] = useState([]);
    const [specialProducts, setSpecialProducts] = useState([]);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]);

    
    const fetchSpecialProducts = async () => {
    try {

        const response = await fetch(`${BASE_URL}/products/specialproduct/`);

        console.log("debug = " ,response)
        // نسخه کلون برای لاگ
        const debugData = await response.clone().json();
        console.log(response.status);
        console.log("Raw response data:", debugData);

        const data = await response.json();
        setSpecialProducts(data || []);
    } catch (error) {
        console.error("خطا در دریافت محصولات ویژه:", error.message, error);
    }
};

    const fetchData = async () => {
        try {
            // قبل از فراخوانی API، آدرس را لاگ کنید
            const response = await fetch(`${BASE_URL}/products/new_products?limit=15`);            
            const data = await response.json();
            setProducts(data || []);
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchSpecialProducts();
    }, []);

    return (
        <>
            <div className='page_home'>
                <div className='main-content'>
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <SlideShow />
                        <ProductsSwiperList
                          title="فروش ویژه"
                          products={specialProducts}
                          badgeClass="badge-special-sale"
                            />
                       <ProductsSwiperList
                        title="جدیدترین‌ها"
                        products={products}
                        badgeClass="badge-special-new"
                           />
                       <ProductsSwiperList
                        title="پرفروش‌ترین‌ها"
                        products={bestSellerProducts}
                        badgeClass="badge-special-bestseller"
                       />
                      <ProductsSwiperList
                        title="تخفیف‌دار"
                        products={discountedProducts}
                        badgeClass="badge-special-discount"
                      />
    
                    </Space>
                </div>
            </div>
        </>
    );
};

export default HomePage;
