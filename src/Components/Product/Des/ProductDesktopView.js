                                                    preview={{
          import React, { useState, useEffect } from 'react';
import { Image, InputNumber, Button, Rate } from 'antd';
import { HeartOutlined, ShareAltOutlined, ShoppingOutlined } from '@ant-design/icons';
import ProductsSwiperList from '../../ProductsSwiperList/ProductsSwiperList';
import { seperatNumber, calcDiscount } from '../../../Utils/utilities';

const ProductDesktopView = ({ product, relatedProducts }) => {
  const price = parseFloat(product.base_price);
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState(price);

  useEffect(() => {
    setNewPrice(price * quantity);
  }, [price, quantity]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-desktop">
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

export default ProductDesktopView;                                              visible: false,
                                                    }}
                                                    src={product.image}
                                                    onClick={() => setVisible(true)}
                                                />
                                            </a>
                                            <div className='thumbs thumbs-items clearfix'>
                                                <Image.PreviewGroup
                                                    preview={{
                                                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                    }}
                                                >

                                                    {
                                                        product.images.map((image, index) => (
                                                            <Image width={100} height={100} src={image} key={index} />
                                                        ))
                                                    }
                                                </Image.PreviewGroup>
                                            </div>
                                            <div className="btn-float">
                                                <span className="btn-wishlist btn-wishlist-163168" data-id="163168">
                                                    <HeartOutlined />
                                                </span>
                                                <span className="btn-share" data-fancybox="share-box" data-src="#share-box">
                                                    <ShareAltOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className='section-left'>
                                            <div className='section-left-top'>
                                                <div className='section-left-1'>
                                                    <div className='brand-section'>
                                                        <a className='brand-link' href='#'>
                                                            <img src={brand} alt='brand logo' width={60} height={60} />
                                                        </a>
                                                    </div>
                                                    <h1 className='title'>{product.name}</h1>
                                                    <h2 className='subtitle'>{product.slug}</h2>
                                                    <ul className="details-bar">
                                                        <li className="rate-section">
                                                            <StarFilled color='yellow' />
                                                            <span className="star-rate"> 3.41</span>
                                                            <span className="reviewcount">
                                                                ( <span>{product.comments.length} دیدگاه</span> )
                                                            </span>
                                                        </li>
                                                        <li className="page-name">
                                                            <span>دسته بندی :
                                                                <Link className="page-23303" to={`/category/${product.category.slug}`}>
                                                                    {product.category.name}
                                                                </Link>
                                                            </span>
                                                        </li>
                                                        <li className="product-code">
                                                            کدکالا: <Input readOnly type="text" value={product.id} id="product-id-code" />
                                                            <CopyOutlined />
                                                        </li>
                                                    </ul>
                                                    <div className='product-features'>
                                                        <span className='title-features'>ویژگی های محصول</span>
                                                        <p>
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='section-left-2'>
                                                    <div className='order'>
                                                        <span className='special-badge'></span>
                                                        <Form
                                                            {...layout}
                                                            name='orderForm'
                                                            className='product-basket'
                                                        >
                                                            <Form.Item
                                                                className='variants'
                                                                name="color"
                                                                label="رنگ"
                                                            >
                                                                <div className='selector-variant form-group'>
                                                                    <Select defaultValue={['black']} className='variants'>
                                                                        <Option value="black">مشکی</Option>
                                                                        <Option value="white">سفید</Option>
                                                                    </Select>
                                                                </div>
                                                            </Form.Item>
                                                            <Form.Item name="count" label="تعداد" className='quantity-section'>
                                                                <InputNumber min={1} max={10} defaultValue={1}
                                                                    onChange={(value) => {
                                                                        setNewPrice(value * product.price)
                                                                    }} />
                                                            </Form.Item>
                                                            <FormItem>
                                                                <span className='old-price'>
                                                                    <span className="old-price-inner">
                                                                        <span className="off-percent">{calcDiscount(product.price, product.price * 1.8, 1)}%</span>
                                                                        <span className="amount-old-price">{seperatNumber(product.price * 1.8)}</span>
                                                                    </span>
                                                                    <span className='price' id="ProductPrice">
                                                                        {seperatNumber(newPrice)}
                                                                        <span className='currency'> تومان</span>
                                                                    </span>
                                                                </span>
                                                            </FormItem>
                                                            <Form.Item>
                                                                <Button id='add_to_basket' size="large" type="primary" htmlType="submit">
                                                                    <ShoppingOutlined />
                                                                    افزودن به سبد
                                                                </Button>
                                                            </Form.Item>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="service-box">
                                                <li>
                                                    <span>
                                                        <img src={guarantyImg} title=" ضمانت اصل بودن کالا" />
                                                        <span className="title"> ضمانت اصل بودن کالا</span>
                                                        <span className="subtitle">تضمین اصالت و گارانتی</span>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src={cartReturnImg} title="ضمانت بازگشت" />
                                                        <span className="title">ضمانت بازگشت</span>
                                                        <span className="subtitle">بازگرداندن کالا در ۷ روز</span>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src={deliveryFastImg} title="تحویل اکسپرس" />
                                                        <span className="title">تحویل اکسپرس</span>
                                                        <span className="subtitle">24 ساعته در تهران</span>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src={paymentImg} title="پرداخت در محل" />
                                                        <span className="title">پرداخت در محل</span>
                                                        <span className="subtitle">فقط در تهران</span>
                                                    </span>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                    <div id='box_related'>
                                        <div className='header clearfix'>
                                            <span className='title h1'>
                                                محصولات مرتبط
                                            </span>
                                        </div>
                                        <div className='body'>
                                            <section className='products items clearfix row mode-4'>
                                                {relatedProducts ?
                                                    <ProductsSwiperList products={relatedProducts} />
                                                    :
                                                    ''
                                                }
                                            </section>
                                        </div>
                                    </div>

                                    <div className="body-bottom clearfix">
                                        <div className="section-bottom">
                                            <Tabs defaultActiveKey="0" items={items} className="nav " id="product-tabs"></Tabs>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div
                style={{
                    display: 'none',
                }}
            >
                <Image.PreviewGroup
                    preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                    }}
                >
                    {
                        product.images.map((img, index) => (
                            <Image src={img} key={index} />
                        ))
                    }

                </Image.PreviewGroup>
            </div>
        </>
    )
}

export default ProductDesktopView
