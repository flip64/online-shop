import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { slug } = useParams(); // فرض می‌کنیم URL مثل /products/:slug هست
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://backend.bazbia.ir/api/products/${slug}/`);
        if (!res.ok) throw new Error("خطا در دریافت محصول");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <p>در حال بارگذاری محصول...</p>;
  if (error) return <p>خطا: {error}</p>;
  if (!product) return <p>محصولی یافت نشد</p>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>قیمت: {product.base_price} تومان</p>
      <p>دسته‌بندی: {product.category?.name || "نامشخص"}</p>

      <div className="product-images">
        {product.images?.length > 0 ? (
          product.images.map((img, index) => (
            <img
              key={index}
              src={img.image}
              alt={img.alt_text || product.name}
              style={{ width: "200px", margin: "10px" }}
            />
          ))
        ) : (
          <p>تصویری موجود نیست</p>
        )}
      </div>

      <div className="product-specs">
        <h3>مشخصات:</h3>
        {product.specifications?.length > 0 ? (
          <ul>
            {product.specifications.map((spec, idx) => (
              <li key={idx}>
                {spec.name}: {spec.value}
              </li>
            ))}
          </ul>
        ) : (
          <p>مشخصات موجود نیست</p>
        )}
      </div>
    </div>
  );
}
