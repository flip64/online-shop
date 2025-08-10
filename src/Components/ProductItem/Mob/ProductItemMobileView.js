import React from 'react';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import { seperatNumber, calcDiscount } from '../../../Utils/utilities';
import './ProductItemMobileView.css';

const ProductItemMobileView = ({ product }) => {
    const BASE_URL = "http://127.0.0.1:8000/"; // آدرس سرور تصاویر یا API
    const price = product.price ?? 0;
    conset oldPruce = price;
    const hasPrice = product.price !== undefined && product.price !== null;
    const thumb = product?.thumb
      ? (product.thumb.startsWith("http") ? product.thumb : BASE_URL + product.thumb) : null;
    console.log("%cDebug product:", "color: green; font-weight: bold;", hasPrice);
    return (
        <div className="thumb">
            <ul className="badges">
                <li className="badge-special"></li>
                <li className="badge-off"></li>
            </ul>

            <div className="product-link">
                <Link to={`/product/${product.slug}`} title={product.name} className="image-product">
                    <img
                        src={thumb}
                        data-src={thumb}
                        alt={product.slug || name}
                        width="400"
                        height="300"
                    />
                </Link>

                <Link className="h2" to={`/product/${product.slug}`} title={product.name}>
                    {product.name}
                </Link>
            </div>

            <div className="details-price">
                <div className="rate-section">
                    <i className="shape-star">
                        <StarFilled />
                    </i>
                    <span className="star-rate">3.34</span>
                    <span className="reviewcount">(386)</span>
                </div>

                <div className="price-area">
                    <span className="old-price">
                        <span className="old-price-inner">
                            {hasPrice ? (
                                <>
                                    <span className="off-percent">
                                        {calcDiscount(price, price * 1.8, 1)}%
                                    </span>
                                    <span className="amount-old-price">
                                        {seperatNumber(price * 1.8)}
                                    </span>
                                </>
                            ) : (
                                <span className="amount-old-price">نامشخص</span>
                            )}
                        </span>
                    </span>
                    <span className="price">
                        {hasPrice ? (
                            <>
                                <span className="price-amount">
                                    {seperatNumber(price)}
                                </span>
                                <span className="currency">تومان</span>
                            </>
                        ) : (
                            <span className="price-amount">قیمت ندارد</span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductItemMobileView;
