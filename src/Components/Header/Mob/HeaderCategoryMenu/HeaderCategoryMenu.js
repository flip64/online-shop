import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const HeaderCategoryMenu = ({ onClose }) => {
  const [items, setItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  const apiUrl = "http://127.0.0.1:8000/api/products/categories/";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      let categories = [];

      if (Array.isArray(data)) {
        categories = data;
      } else if (data.data && Array.isArray(data.data)) {
        categories = data.data;
      } else {
        console.error("❌ ساختار داده‌ی API غیرمنتظره:", data);
      }

      const formattedItems = convertTreeToMenuItems(categories);
      setItems(formattedItems);
    } catch (error) {
      console.error("⚠️ خطا در دریافت داده از API:", error);
    }
  };
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/products/categories/")
    .then(res => res.json())
    .then(data => console.log("داده:", data))
    .catch(err => console.error("خطا:", err));
}, []);
  useEffect(() => {
    fetchData();
  }, []);

  const convertTreeToMenuItems = (nodes) => {
    return nodes.map((node) => {
      const hasChildren = Array.isArray(node.children) && node.children.length > 0;

      return {
        key: node.id.toString(),
        label: <Link to={`/category/${node.slug}`}>{node.name}</Link>,
        children: hasChildren ? convertTreeToMenuItems(node.children) : undefined,
      };
    });
  };

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const renderMenuItems = (items) => {
    return items.map((item) =>
      item.children ? (
        <Menu.SubMenu key={item.key} title={item.label}>
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      )
    );
  };

  return (
    <Menu mode="inline" onOpenChange={onOpenChange} onClick={onClose} openKeys={openKeys}>
      {renderMenuItems(items)}
    </Menu>
  );
};

export default HeaderCategoryMenu;
