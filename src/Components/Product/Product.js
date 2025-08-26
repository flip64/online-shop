import React, { useEffect, useState } from 'react';
import { isBrowser, isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom';

import './Product.css';

const ProductDesktopView = React.lazy(() => import('./Des/ProductDesktopView'));
const ProductMobileView = React.lazy(() => import('./Mob/ProductMobileView'));

const Product = () => {
    const location = useLocation();
    const [product, setProduct] = useState();
    const [relatedProducts, setRelatedProducts] = useState();
    let address = '';
    let hasRelated = false;

    const BASE_URL = "http://127.0.0.1:8000/api/products/";

    const fetchData = async (address) => {
        const response = await fetch(`${BASE_URL}products/${address}/`);
        console.log('Requesting from:', `${BASE_URL}products/${address}/`);
        const data = await response.json();
        console.log(data);
        setProduct(data);
        fetchRelatedProducts(data.category.slug);
    }

    const fetchRelatedProducts = async (categorySlug) => {
        const response = await fetch(`${BASE_URL}/products/?category=${categorySlug}&limit=15`);
        const data = await response.json();
        setRelatedProducts(data);
    }

    useEffect(() => {
        address = location.pathname;
        console.log(address);
        fetchData(address);
    }, []);

    if (product === undefined || relatedProducts === undefined) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <React.Suspense fallback={<></>}>
                {(isBrowser) && <ProductDesktopView product={product} relatedProducts={relatedProducts} />}
                {(isMobile) && <ProductMobileView product={product} relatedProducts={relatedProducts} />}
            </React.Suspense>
        </>
    );
}

export default Product;
