import React from 'react';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import { seperatNumber, calcDiscount } from '../../../Utils/utilities';
import './ProductItemMobileView.css';

const ProductItemMobileView = ({ product, badgeClass }) => {
    const BASE_URL = "http://127.0.0.1:8000/"; // آدرس سرور تصاویر یا API

    // بررسی وجود قیمت
    const hasPrice = product.base_price !== undefined && product.base_price !== null;
    const price = product.base_price ?? 0;
    const priceFormatted = hasPrice ? seperatNumber(price) : null;

    // قیمت قدیمی
    const oldPrice = product.old_price ?? price;
    const oldPriceFormatted = hasPrice ? seperatNumber(oldPrice) : null;

    // درصد تخفیف
    const discountPercent = hasPrice ? calcDiscount(price, oldPrice, 1) : null;

    // تصویر محصول
    const thumb = product?.thumb
        ? (product.thumb.startsWith("http") ? product.thumb : BASE_URL + product.thumb)
        : BASE_URL + "media/default-thumb.jpg"; // پیش‌فرض اگر تصویر نباشد

    const name = product?.name || "بدون نام";
    const slug = product?.slug || "";

    return (
        <div className="thumb">
            <ul className="badges">
                {/* کلاس badgeClass برای متن داینامیک هر لیست */}
                <li className={`badge-special ${badgeClass || ''}`}></li>
                <li className="badge-off"></li>
            </ul>

            <div className="product-link">
                <Link to={`/product/${slug}`} title={name} className="image-product">
                    <img
                        src={thumb}
                        alt={slug || name}
                        width="400"
                        height="300"
                    />
                </Link>

                <Link className="h2" to={`/product/${slug}`} title={name}>
                    {name}
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
                                        {discountPercent}%
                                    </span>
                                    <span className="amount-old-price">
                                        {oldPriceFormatted}
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
                                    {priceFormatted}
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
