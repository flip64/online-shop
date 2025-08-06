import React, { useEffect, useState } from "react";
import { Space } from 'antd';
import SlideShow from '../../Components/SlideShow/SlideShow';
import ProductsSwiperList from '../../Components/ProductsSwiperList/ProductsSwiperList';

const HomePage = () => {

    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products/products?limit=15");
            const data = await response.json();
            console.log("Fetched data:", data);
            setProducts(data); // اطمینان داری که data آرایه است؟
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <p>تعداد محصولات: {products.length}</p>
            <div className='page_home'>
                <div className='main-content'>
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <SlideShow />
                        <ProductsSwiperList products={products} />
                        <ProductsSwiperList products={products} />
                    </Space>
                </div>
            </div>
        </>
    );
};

export default HomePage;
