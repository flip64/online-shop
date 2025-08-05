import React, { useEffect, useState } from "react";
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const HeaderCategoryMenu = ({ onClose }) => {
  const [items, setItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  // آدرس API جنگو رو اینجا بذار
  const apiUrl = "http://127.0.0.1:8000/api/products/categories/";

  const fetchData = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/products/categories/");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setCategories(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setCategories(data.data);
                } else {
                    console.error("Unexpected API response structure:", data);
                }
            } catch (error) {
      
      
    
      console.error("خطا در دریافت داده از API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // تبدیل درخت دسته‌بندی‌ها به فرمت منوی antd به صورت بازگشتی
  const convertTreeToMenuItems = (tree) => {
    return tree.map(node => ({
      key: node.id.toString(),
      label: <Link to={`/category/${node.slug}`}>{node.name}</Link>,
      children: node.children ? convertTreeToMenuItems(node.children) : undefined,
    }));
  };

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      mode="inline"
      onOpenChange={onOpenChange}
      onClick={onClose}
      openKeys={openKeys}
      items={items}
    />
  );
};

export default HeaderCategoryMenu;
