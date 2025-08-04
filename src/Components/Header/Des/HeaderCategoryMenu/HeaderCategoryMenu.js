import React, { useEffect, useState } from "react";
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './HeaderCategoryMenu.css';

const HeaderCategoryMenu = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/products/categories/");
                const data = await response.json();
                console.log(JSON.stringify(data, null, 2));

                if (Array.isArray(data)) {
                    setCategories(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setCategories(data.data);
                } else {
                    console.error("Unexpected API response structure:", data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);

    const renderSubCategories = (subCategories) => {
        return (
            <ul>
               
                {subCategories.map((sub) => (
                    <li key={sub.id}>
                        <Link to={`/category/${sub.slug}`} className="page_14">
                            {sub.name}
                        </Link>
                    </li>
                ))}
            </ul>
        );
    };

    if (categories.length === 0) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <ul className="menu-2 menu-custom menu-2 mega three-level" id="menu_header">
            {categories.map((category) => (
                <li key={category.id} className={category.children ? 'deep-3' : ''}>
                    <Link title={category.slug} className="page_1 sf-with-ul" to={`/category/${category.slug}`}>
                        {category.name}
                        {category.children && category.children.length > 0 && <DownOutlined />}
                    </Link>

                    {category.children && category.children.length > 0 && (
                        <ul>
                            <div className="ul-title">
                                <span className="link-title">{category.name}</span>
                                <Link to={`/category/${category.slug}`} className="more-items">
                                    مشاهده همه محصولات {category.name}
                                    <LeftOutlined />
                                </Link>
                            </div>
                            {renderSubCategories(category.children)}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default HeaderCategoryMenu;
