import React from 'react';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import { seperatNumber, calcDiscount } from '../../../Utils/utilities';
import './ProductItemMobileView.css';

const ProductItemMobileView = ({ product }) => {
    const price = product.price ?? 0;
    const hasPrice = product.price !== undefined && product.price !== null;

    return (
        <div className="thumb">
            <ul className="badges">
                <li className="badge-special"></li>
                <li className="badge-off"></li>
            </ul>

            <div className="product-link">
                <Link to={`/product/${product.slug}`} title={product.name} className="image-product">
                    <img
                        src={product.thumb}
                        data-src={product.thumb}
                        alt={product.slug || product.name}
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
