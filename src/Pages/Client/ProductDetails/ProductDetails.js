import React, { useState } from "react";
import { Image, InputNumber, Button, Rate } from "antd";
import { HeartOutlined, ShareAltOutlined, ShoppingOutlined } from "@ant-design/icons";
import ProductsSwiperList from "../ProductsSwiperList/ProductsSwiperList";
import "./ProductDetail.css";

const ProductDetail = ({ product, relatedProducts }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0]?.image || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div>Loading...</div>;

  const price = parseFloat(product.base_price) || 0;
  const newPrice = price * quantity;

  return (
    <div className="product-detail-container">
      {/* بالای صفحه: گالری و اطلاعات */}
      <div className="product-main">
        <div className="product-images">
          <Image.PreviewGroup>
            <div className="main-image">
              <img src={mainImage} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img.image}
                  alt={product.name}
                  onClick={() => setMainImage(img.image)}
                />
              ))}
            </div>
          </Image.PreviewGroup>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <Rate allowHalf defaultValue={product.rating || 0} />

          <div className="price-section">
            <span className="new-price">{newPrice.toLocaleString()} تومان</span>
            {price > 0 && (
              <>
                <span className="old-price">{(price * 1.2).toLocaleString()} تومان</span>
                <span className="discount">{Math.round(((price * 1.2 - price) / (price * 1.2)) * 100)}%</span>
              </>
            )}
          </div>

          <div className="product-actions">
            <InputNumber min={1} max={100} value={quantity} onChange={val => setQuantity(val)} />
            <Button type="primary" icon={<ShoppingOutlined />}>افزودن به سبد</Button>
            <Button shape="circle" icon={<HeartOutlined />} />
            <Button shape="circle" icon={<ShareAltOutlined />} />
          </div>

          <div className="product-description">
            <h3>توضیحات محصول</h3>
            <p>{product.description || "توضیحی برای این محصول ثبت نشده است."}</p>
          </div>
        </div>
      </div>

      {/* محصولات مرتبط */}
      <div className="related-products">
        <h3>محصولات مرتبط</h3>
        {relatedProducts?.length > 0 ? (
          <ProductsSwiperList products={relatedProducts} />
        ) : (
          <p>محصول مرتبطی وجود ندارد.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
