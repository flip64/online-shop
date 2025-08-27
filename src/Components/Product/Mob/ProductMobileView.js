import React, { useState, useEffect } from 'react';
import { Image, InputNumber, Button, Rate } from 'antd';
import { HeartOutlined, ShareAltOutlined, ShoppingOutlined } from '@ant-design/icons';
import ProductsSwiperList from '../../ProductsSwiperList/ProductsSwiperList';
import { seperatNumber, calcDiscount } from '../../../Utils/utilities';
import './ProductMobileView.css';  // 👈 استایل جدا

const ProductMobileView = ({ product, relatedProducts }) => {
  const price = parseFloat(product.base_price) || 0;
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState(price);

  useEffect(() => {
    setNewPrice(price * quantity);
  }, [price, quantity]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-mobile">
      {/* تصویر محصول */}
      <div className="product-image">
        <Image.PreviewGroup>
          {Array.isArray(product.images) && product.images.map((img, index) => (
            <Image key={index} src={img.image} alt={product.name} />
          ))}
        </Image.PreviewGroup>
      </div>

      {/* نام و امتیاز */}
      <div className="product-header">
        <h1>{product.name}</h1>
        <Rate allowHalf defaultValue={product.rating || 0} />
      </div>

      {/* قیمت */}
      <div className="product-price">
        <span className="new-price">{seperatNumber(newPrice)} تومان</span>
        {price > 0 && (
          <>
            <span className="old-price">{seperatNumber(price * 1.8)}</span>
            <span className="discount">{calcDiscount(price, price * 1.8, 1)}%</span>
          </>
        )}
      </div>

      {/* تعداد و خرید */}
      <div className="product-actions">
        <InputNumber min={1} max={100} value={quantity} onChange={val => setQuantity(val)} />
        <Button type="primary" icon={<ShoppingOutlined />}>افزودن به سبد</Button>
        <Button shape="circle" icon={<HeartOutlined />} />
        <Button shape="circle" icon={<ShareAltOutlined />} />
      </div>

      {/* توضیحات */}
      <div className="product-description">
        <h3>توضیحات محصول</h3>
        <p>{product.description || "توضیحاتی برای این محصول ثبت نشده است."}</p>
      </div>

      {/* محصولات مرتبط */}
      <div className="related-products">
        <h3>محصولات مرتبط</h3>
        {relatedProducts.length > 0 ? (
          <ProductsSwiperList products={relatedProducts} />
        ) : (
          <p>محصول مرتبطی وجود ندارد.</p>
        )}
      </div>
    </div>
  );
};

export default ProductMobileView;
