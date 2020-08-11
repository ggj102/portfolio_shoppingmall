import React, { useEffect, useState } from 'react'
import '../css/ProductsList.css'
import Axios from 'axios';

function ProductsList()
{
    const [listData,setListData] = useState({});
    const [listItemData,setListItemData] = useState([]);

    useEffect(()=>{        
        Axios.get(process.env.PUBLIC_URL+'/ProductsListData.json').then((response)=>{
        setListData(response.data);
        setListItemData(response.data.item_list);
    })
    },[])

    const saleCal = (price1,price2) =>{
        const cal = price2 - price1;
        const cal2 = cal/(price2/100);
        return parseInt(cal2);
    }

    const itemList = listItemData.map((arr)=>{
        return(
            <li>
                <a href="#">
                    <div className="item_img"><img  src={arr.thumb_image ? arr.thumb_image:''} alt="img"/></div>
                    <strong className="item_title">{arr.name}</strong>
                    <div className="area_price">
                        
                        <strong className="itme_price">{arr.price}</strong>
                       
                        {arr.original_price ?
                        <>    
                        <strong className="itme_original_price">{arr.original_price}</strong>
                        <strong className="itme_sale">{saleCal(arr.price,arr.original_price)}%</strong>
                        </>:''}
                    </div>
                    <p className="item_text">친구들 다 같이 모여봐요 동물의 숲이에요^^ 즐거운 시간을 보내세요</p>
                </a>

                <div className="area_flag">
                    {arr.is_best ? <div className="flag_best">BEST</div> : ''}
                    {arr.is_new ? <div className="flag_new">NEW</div> : ''}
                </div>

                {arr.review_count > 0 ?                 
                <div className="area_estimaion">
                    <span className="label">리뷰</span>
                    <span className="count">{arr.review_count}</span>
                    <span className="label">평점</span>
                    <span className="count">
                        {arr.review_score}
                        <span className="slash">/</span>
                        5
                    </span>
                </div>: ''}

                {arr.sold_out ?           
                 <div className="soldout">
                    <div className="soldout_box">
                        SOLDOUT
                    </div>
                </div> : ''}
            </li>
        )
    })

    return(
        <div className="content_productsList">
            <div className="category_list">
                <div className="list_title">
                    <h3>
                        <span>{listData.title}</span>
                    </h3>
                    <div className="category_route">
                        <ul>
                            <li>
                                <a href="#" className="route_text">홈</a>
                                <span className="arrow_mark">{'>'}</span>
                            </li>
                            <li>
                                <a href="#" className="route_text2">Nintendo Switch(29)</a>
                                <span className="arrow_mark">{'>'}</span>
                            </li>
                            <li>
                                <a href="#" className="route_text">전체</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="list_sort">
                    <ul>
                        <li>
                            <a href="#" className="sort_tab_focus">
                             <span>V</span>
                                인기도순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab ">누적판매순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab">낮은가격순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab">최신등록순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab">리뷰많은순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab sort_tab_last">평점높은순</a>
                        </li>
                    </ul>
                    
                    <div className="sort_option">
                        <div className="sort_selectBox">
                            <select>
                                <option>20개씩 보기</option>
                                <option>40개씩 보기</option>
                                <option>60개씩 보기</option>
                                <option>80개씩 보기</option>
                            </select>
                        </div>
                        
                        <div className="sort_view_type">
                            <ul>
                                <li className="option_tab_focus">1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="item_list">
                    <ul>
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductsList;