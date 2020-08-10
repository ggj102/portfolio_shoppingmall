import React from 'react'
import '../css/ProductsList.css'

function ProductsList()
{
    return(
        <div className="content_productsList">
            <div className="category_list">
                <div className="list_title">
                    <h3>
                        <span>Nintendo Switch</span>
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
                        <li>
                            <a href="#">
                                <div className="test_img"></div>
                                <strong className="item_title">NS 닌텐도 스위치 모여봐요 동물의 숲 한글</strong>
                                <div className="area_price">
                                    <strong className="itme_price">56,500원</strong>
                                    <strong className="itme_sale_price">64,800원</strong>
                                    <strong className="itme_sale">12%</strong>
                                </div>
                                <p className="item_text">친구들 다 같이 모여봐요 동물의 숲이에요^^ 즐거운 시간을 보내세요</p>
                            </a>

                            <div className="area_flag">
                                <div className="flag_best">BEST</div>
                                <div className="flag_new">NEW</div>
                            </div>

                            <div className="area_estimaion">
                                <span className="label">리뷰</span>
                                <span className="count">2</span>
                                <span className="label">평점</span>
                                <span className="count">
                                    5.0
                                    <span className="slash">/</span>
                                    5
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductsList;