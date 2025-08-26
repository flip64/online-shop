import React, { useEffect, useState } from 'react';
import { isBrowser, isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';

const ProductDesktopView = React.lazy(() => import('./Des/ProductDesktopView'));
const ProductMobileView = React.lazy(() => import('./Mob/ProductMobileView'));

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://backend.bazbia.ir/api/products/";

  const fetchProduct = async (slug) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}${slug}/`);
      if (!response.ok) throw new Error(`Failed to fetch product: ${response.status}`);
      const data = await response.json();
      setProduct(data);

      if (data.category?.slug) {
        fetchRelatedProducts(data.category.slug);
      } else {
        setRelatedProducts([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (categorySlug) => {
    try {
      const response = await fetch(`${BASE_URL}?category=${categorySlug}&limit=15`);
      if (!response.ok) throw new Error(`Failed to fetch related products: ${response.status}`);
      const data = await response.json();
      setRelatedProducts(data);
    } catch (err) {
      console.error(err);
      setRelatedProducts([]);
    }
  };

  useEffect(() => {
    if (slug) fetchProduct(slug);
  }, [slug]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <React.Suspense fallback={<div>Loading view...</div>}>
      {isBrowser && <ProductDesktopView product={product} relatedProducts={relatedProducts} />}
      {isMobile && <ProductMobileView product={product} relatedProducts={relatedProducts} />}
    </React.Suspense>
  );
};

export default Product;
