import React, { useState, useEffect } from 'react';
import { Image, InputNumber, Button, Rate } from 'antd';
import { HeartOutlined, ShareAltOutlined, ShoppingOutlined } from '@ant-design/icons';
import ProductsSwiperList from '../../ProductsSwiperList/ProductsSwiperList';
import { seperatNumber, calcDiscount } from '../../../Utils/utilities';

const ProductMobileView = ({ product, relatedProducts }) => {
  const price = parseFloat(product.base_price);
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState(price);

  useEffect(() => {
    setNewPrice(price * quantity);
  }, [price, quantity]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-mobile">
      <h1>{product.name}</h1>
      <p>{product.slug}</p>

      <Image.PreviewGroup>
        {product.images.map((img, index) => (
          <Image key={index} src={img.image} alt={product.name} />
        ))}
      </Image.PreviewGroup>

      <div className="price-section">
        <InputNumber
          min={1}
          max={100}
          value={quantity}
          onChange={val => setQuantity(val)}
        />
        <span>{seperatNumber(newPrice)} تومان</span>
        <span className="old-price">{seperatNumber(price * 1.8)}</span>
        <span className="discount">{calcDiscount(price, price * 1.8, 1)}%</span>
      </div>

      <div className="actions">
        <Button icon={<ShoppingOutlined />}>افزودن به سبد</Button>
        <HeartOutlined />
        <ShareAltOutlined />
      </div>

      <div className="related-products">
        {relatedProducts.length > 0 && <ProductsSwiperList products={relatedProducts} />}
      </div>

      <div className="rating">
        <Rate allowHalf defaultValue={product.rating || 0} />
      </div>
    </div>
  );
};

export default ProductMobileView;
