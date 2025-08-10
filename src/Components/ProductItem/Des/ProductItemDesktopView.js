import React from 'react';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import { seperatNumber, calcDiscount } from '../../../Utils/utilities';
import './ProductItemDesktopView.css';

const ProductItemDesktopView = ({ product }) => {
   const BASE_URL = "http://127.0.0.1:8000/"; // آدرس سرور تصاویر یا API

    const price = Math.round(product?.base_price ?? 0);
    const oldPrice = price
    const hasPrice = price !== undefined && price !== null;

    // محاسبات رو یکبار انجام میدیم
    const discountPercent = hasPrice ? calcDiscount(price, oldPrice, 1) : null;
    const oldPriceFormatted = hasPrice ? seperatNumber(oldPrice) : null;
    const priceFormatted = hasPrice ? seperatNumber(price) : null;
    
    const slug = product?.slug;
    const name = product?.name;
    const thumb = product?.thumb
     ? (product.thumb.startsWith("http") ? product.thumb : BASE_URL + product.thumb) : null;


    console.log("%cDebug product:", "color: green; font-weight: bold;", thumb);


    return (
        <div className="thumb">
            <ul className="badges">
                {hasPrice && <li className="badge-off">{discountPercent}%</li>}
            </ul>

            <div className="product-link">
                <Link to={`/product/${slug}`} title={name} className='product-box-img'>
                    <img
                        className="product-image"
                        src={thumb}
                        loading="lazy" // برای افزایش سرعت لود
                        alt={slug || name}
                        width="400"
                        height="300"
                    />
                </Link>

                <div className="details">
                    <Link className="title" to={`/product/${slug}`} title={name}>
                        {name}
                    </Link>

                    <div className="details-price">
                        <div className="price-area">
                            <span className="old-price">
                                <span className="old-price-inner">
                                    {hasPrice ? (
                                        <>
                                            <span className="amount-old-price">{oldPriceFormatted}</span>
                                        </>
                                    ) : (
                                        <span className="amount-old-price">نامشخص</span>
                                    )}
                                </span>
                            </span>

                            <span className="price">
                                {hasPrice ? (
                                    <>
                                        <span className="price-amount">{priceFormatted}</span>
                                        <span className="currency">تومان</span>
                                    </>
                                ) : (
                                    <span className="price-amount">قیمت ندارد</span>
                                )}
                            </span>
                        </div>

                        <div className="rate-section">
                            <span className="reviewcount">(10)</span>
                            <span className="star-rate">4.2</span>
                            <i className="shape-star">
                                <StarFilled />
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItemDesktopView;
