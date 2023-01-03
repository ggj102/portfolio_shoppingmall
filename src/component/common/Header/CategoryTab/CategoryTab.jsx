import React, { useState, useEffect } from "react";
import "../../../../css/common/Header.css";
import { NavLink } from "react-router-dom";
import { MainPageHeaderAxios } from "../../api";

export default function CategoryTab() {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [currentOpenDepth, setCurrentOpenDepth] = useState([]);

  useEffect(() => {
    MainPageHeaderAxios().then((res) => {
      const { category_list, subcategory_list } = res.data.category_list;
      setCategoryList(category_list);
      setSubCategoryList(subcategory_list);
    });
  }, []);

  const onMouseEnterOpenDepth = (id, index) => {
    const copyArr = [...currentOpenDepth];
    if (!copyArr[index]) copyArr.push(id);
    else copyArr[index] = id;

    setCurrentOpenDepth(copyArr);
  };

  const onMouseLeaveCloseDepth = (index) => {
    const copyArr = [...currentOpenDepth];
    copyArr.splice(index);
    setCurrentOpenDepth(copyArr);
  };

  const subCategoryTab = (parentId, index) => {
    const fliter = subCategoryList.filter((val) => val.parent_id === parentId);

    if (fliter.length === 0) return;
    else {
      return (
        <div
          className={`depth ${index === 0 ? "parnetDepth" : "subDepth"} ${
            currentOpenDepth[index] === parentId ? "depthOpen" : "depthClose"
          }`}
          onMouseLeave={() => onMouseLeaveCloseDepth(index)}
        >
          {fliter.map((val, idx) => {
            return (
              <div key={`sub${val.id}${idx}`}>
                <NavLink to={"/CategoryProductsList/" + val.id}>
                  <span
                    onMouseEnter={() =>
                      onMouseEnterOpenDepth(val.id, index + 1)
                    }
                  >
                    {val.name}
                  </span>
                </NavLink>
                {subCategoryTab(val.id, index + 1)}
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="categoryTabWrapper">
      <div className="categoryTab">
        {categoryList.map((val, idx) => {
          return (
            <div
              key={`category${idx}`}
              className="category"
              onMouseEnter={() => onMouseEnterOpenDepth(val.id, 0)}
              onMouseLeave={() => onMouseLeaveCloseDepth(0)}
            >
              <NavLink to={"/CategoryProductsList/" + val.id}>
                {val.name}
              </NavLink>
              {subCategoryTab(val.id, 0)}
            </div>
          );
        })}
        <div className="category">
          <a href="#allprd">전체상품</a>
        </div>
      </div>
    </div>
  );
}
