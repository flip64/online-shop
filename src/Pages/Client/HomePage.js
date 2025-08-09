import React, { useEffect, useState } from "react";
import { Space } from 'antd';
import SlideShow from '../../Components/SlideShow/SlideShow';
import ProductsSwiperList from '../../Components/ProductsSwiperList/ProductsSwiperList';

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const [specialProducts, setSpecialProducts] = useState([]);



    const fetchSpecialProducts = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/products/specialproduct/");
        
        // نسخه کلون برای لاگ
        const debugData = await response.clone().json();
        console.log("Raw response data:", debugData);

        const data = await response.json();
        setSpecialProducts(data || []);
    } catch (error) {
        console.error("خطا در دریافت محصولات ویژه:", error.message, error);
    }
};

    const fetchData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products/products?limit=15");
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
                        <ProductsSwiperList title="محصولات ویژه" products={specialProducts} />
                        <ProductsSwiperList title="جدیدترین محصولات" products={products} />
                    </Space>
                </div>
            </div>
        </>
    );
};

export default HomePage;
