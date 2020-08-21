import React, { useEffect, useState } from 'react';
import '../../css/MainPage.css'
import Axios from 'axios';

function MainPageHeader()
{
    const [headerData,setHeaderData] = useState({});
    const [categoryData,setCategoryData] = useState([]);
    const [mouseOverState,setMouseOverState] = useState(0);

    useEffect(()=>{
        Axios.get(process.env.PUBLIC_URL+'/MainPageData/MainPageHeader.json').then((response)=>{
            console.log(response.data);
            setHeaderData(response.data);
            setCategoryData(response.data.category_list);
        })
    },[])

    const categoryMouseOver = (id) =>{
        setMouseOverState(id);
    }

    const categoryMouseOut = () =>{
        setMouseOverState(0);
    }

    const categoryMap = categoryData.map((arr)=>{
        return(
            <li>
                <div className="category_name" 
                onMouseOver={()=>categoryMouseOver(arr.id)}
                onMouseOut={categoryMouseOut}
                >{arr.name}</div>
                {arr.id === mouseOverState ? 
                    <div className="categoryMouseOver_list">

                </div>: ''}
                
                {/* <select>
                    <option>{arr.name}</option>
                    {arr.sub_category.map((arr2)=>{
                        return(
                            <option>{arr2.name}</option>
                        )
                    })}
                </select> */}
            </li>
        )
    })



    return(
        <div className="layout_header">
            <div className="header_shopping">
                <div className="layout_inner">
                    <div className="globla_area">
                        <div className="header_menu">
                            <div className="menu_area">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <span>찜한 스토어</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">
                                            <span>마이페이지</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">
                                            <span>장바구니</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="shop_area">
                        <div className="title">
                            <a href="#">{headerData.title}</a> 
                        </div>
                        <div className="search_area">

                        </div>
                    </div>
                </div>
            </div>

            <div className="category_area">
                <div className="category_inner">
                    <ul>
                        {categoryMap}
                        
                        <li>
                            <div className="category_btn">
                                <a href="#">전체상품</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainPageHeader;