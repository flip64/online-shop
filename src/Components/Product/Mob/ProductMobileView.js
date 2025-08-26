import React, { useEffect, useState } from 'react';
import { Col, Row, Image, Form, Input, InputNumber, Button, Rate } from 'antd';
import { HeartOutlined, ShareAltOutlined, ShoppingOutlined, CommentOutlined, MessageOutlined } from '@ant-design/icons';
import ProductsSwiperList from '../../ProductsSwiperList/ProductsSwiperList';
import ProductCommentItems from '../../ProductCommentItems/ProductCommentItems';
import { seperatNumber, calcDiscount } from '../../../Utils/utilities';

const ProductMobileView = ({ product, relatedProducts }) => {
    const [newPrice, setNewPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(1);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (product?.price) setNewPrice(product.price * quantity);
    }, [product?.price, quantity]);

    if (!product) return <div>Loading...</div>;

    return (
        <>
            <div className="product-mobile">
                <h1>{product.name}</h1>
                <p>{product.slug}</p>
                <Image.PreviewGroup>
                    {product.images.map((img, idx) => (
                        <Image src={img} key={idx} />
                    ))}
                </Image.PreviewGroup>

                <div className="price-section">
                    <InputNumber min={1} max={100} value={quantity} onChange={setQuantity} />
                    <span>{seperatNumber(newPrice)} تومان</span>
                    <span className="old-price">{seperatNumber(product.price * 1.8)}</span>
                    <span className="discount">{calcDiscount(product.price, product.price * 1.8, 1)}%</span>
                </div>

                <div className="actions">
                    <Button icon={<ShoppingOutlined />}>افزودن به سبد</Button>
                    <HeartOutlined />
                    <ShareAltOutlined />
                </div>

                <div className="related-products">
                    {relatedProducts && <ProductsSwiperList products={relatedProducts} />}
                </div>

                <div className="rating">
                    <Rate allowHalf defaultValue={product.rating || 0} />
                </div>

                {/* فرم کامنت */}
                <div className="comments-section">
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col lg={10} md={10} sm={10} xs={24}>
                                <Form.Item label="نام و نام خانوادگی">
                                    <Input placeholder="نام و نام خانوادگی خود را وارد کنید" size="large" />
                                </Form.Item>
                                <Form.Item label="ایمیل">
                                    <Input placeholder="ایمیل خود را وارد کنید" type='email' size="large" />
                                </Form.Item>
                            </Col>
                            <Col lg={14} md={14} sm={14} xs={24}>
                                <Form.Item label="دیدگاه خود را با ما در میان بگذارید">
                                    <Input.TextArea placeholder="متن دیدگاه خود را بنویسید" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">ارسال دیدگاه</Button>
                        </Form.Item>
                    </Form>

                    <ul id="comments">
                        <ProductCommentItems comments={product.comments} />
                    </ul>
                </div>
            </div>

            {/* مخفی برای پیش‌نمایش تصاویر */}
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup
                    preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                    }}
                >
                    {product.images.map((img, index) => (
                        <Image src={img} key={index} />
                    ))}
                </Image.PreviewGroup>
            </div>
        </>
    );
};

export default ProductMobileView;
