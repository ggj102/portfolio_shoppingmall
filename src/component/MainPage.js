import React from 'react';
import '../css/MainPage.css'

function MainPage()
{
    return(
        <div className="main_page">
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
                                <a href="#">시온스토어</a> 
                            </div>
                            <div className="search_area">

                            </div>
                        </div>
                    </div>
                </div>

                <div className="category_area">
                    <div className="category_inner">
                        <ul>
                            <li>
                                <select>
                                    <option>디지털/가전</option>
                                </select>
                            </li>

                            <li>
                                <select>
                                    <option>생활/건강</option>
                                </select>
                            </li>

                            <li>
                                <select>
                                    <option>출산/육아</option>
                                </select>
                            </li>

                            <li>
                                <div className="category_btn">
                                    <a href="#">전체상품</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="main_content">
                <div className="bestreview_list">
                    <h4>
                        <span className="bestreview_title">베스트리뷰상품</span>
                    </h4>

                    <div className="bestreview_layout_inner">
                        <ul className="bestview_list">
                            <li>
                                <a href="#" className="bestreview_atag">
                                    <div className="bestreview_thumbnail">

                                    </div>

                                    <div className="area_stylebox">
                                        <div className="area_text">
                                            <span>
                                                너무 예뻐요 사길 잘한것 같아요
                                            </span>
                                        </div>

                                        <div className="area_reviewinfo">
                                            <span className="text_info">kim****</span>
                                            <span className="text_info text_info2">2020.08.05.</span>
                                        </div>

                                        <div className="product_name">
                                            <span>
                                                한국정품 닌텐도 스위치 모여봐요 동물의 숲 에디션 새제품 재고보유 오늘출발
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="bestreview_atag">
                                    <div className="bestreview_thumbnail">

                                    </div>

                                    <div className="area_stylebox">
                                        <div className="area_text">
                                            <span>
                                                너무 예뻐요 사길 잘한것 같아요
                                            </span>
                                        </div>

                                        <div className="area_reviewinfo">
                                            <span className="text_info">kim****</span>
                                            <span className="text_info text_info2">2020.08.05.</span>
                                        </div>

                                        <div className="product_name">
                                            <span>
                                                한국정품 닌텐도 스위치 모여봐요 동물의 숲 에디션 새제품 재고보유 오늘출발
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="bestreview_atag">
                                    <div className="bestreview_thumbnail">

                                    </div>

                                    <div className="area_stylebox">
                                        <div className="area_text">
                                            <span>
                                                너무 예뻐요 사길 잘한것 같아요
                                            </span>
                                        </div>

                                        <div className="area_reviewinfo">
                                            <span className="text_info">kim****</span>
                                            <span className="text_info text_info2">2020.08.05.</span>
                                        </div>

                                        <div className="product_name">
                                            <span>
                                                한국정품 닌텐도 스위치 모여봐요 동물의 숲 에디션 새제품 재고보유 오늘출발
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="bestreview_atag">
                                    <div className="bestreview_thumbnail">

                                    </div>

                                    <div className="area_stylebox">
                                        <div className="area_text">
                                            <span>
                                                너무 예뻐요 사길 잘한것 같아요
                                            </span>
                                        </div>

                                        <div className="area_reviewinfo">
                                            <span className="text_info">kim****</span>
                                            <span className="text_info text_info2">2020.08.05.</span>
                                        </div>

                                        <div className="product_name">
                                            <span>
                                                한국정품 닌텐도 스위치 모여봐요 동물의 숲 에디션 새제품 재고보유 오늘출발
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>

                        <div className="list_product_listview_circle">
                            <ul className="listview_list">
                                <li>
                                    <a href="#" className="listview_atag">
                                        <div className="bestreview_thumbnail"></div>
                                        <p className="bestreview_text">배송도 빠르고 색상바꼈다고 서비스도 주셔서 좋네요</p>
                                        <div className="listview_product_name">
                                            <span className="bestreview_text2">애플 정품 아이폰XR 128G/256G 자급제폰 언락폰 미개통 공기계 미개봉 새제품 오늘출발</span>
                                        </div>
                                    </a>
                                    <div className="listview_area_reviewinfo">
                                        <span className="text_info">fore****</span>
                                        <span className="text_info text_info2">2020.08.13.</span>
                                    </div>
                                </li>

                                <li>
                                    <a href="#" className="listview_atag">
                                        <div className="bestreview_thumbnail"></div>
                                        <p className="bestreview_text">배송도 빠르고 색상바꼈다고 서비스도 주셔서 좋네요</p>
                                        <div className="listview_product_name">
                                            <span className="bestreview_text2">애플 정품 아이폰XR 128G/256G 자급제폰 언락폰 미개통 공기계 미개봉 새제품 오늘출발</span>
                                        </div>
                                    </a>
                                    <div className="listview_area_reviewinfo">
                                        <span className="text_info">fore****</span>
                                        <span className="text_info text_info2">2020.08.13.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                
                <div>
                    <h4 className="allprd_title">
                        <span className="title_inner">상품전체</span>
                    </h4>

                    <div className="allprd_sort">
                        <ul className="allprd_sort_ul">
                            <li className="allprd_sort_li">
                                <a href="#" className="allprd_sort_atag allprd_sort_focus">
                                    <span>V</span>
                                    판매자추천순
                                </a>
                            </li>

                            <li className="allprd_sort_li">
                                <a href="#" className="allprd_sort_atag">
                                    인기도순
                                </a>
                            </li>

                            <li className="allprd_sort_li">
                                <a href="#" className="allprd_sort_atag">
                                    평점높은순
                                </a>
                            </li>

                            <li className="allprd_sort_li">
                                <a href="#" className="allprd_sort_atag">
                                    최신등록순
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="allprd_list">
                            <ul className="allprd_list_ul">
                                <li className="allprd_list_li">
                                    <a href="#" className="allprd_list_atag">
                                        <div className="allprd_list_thumbnail">
                                            
                                        </div>
                                        <strong className="allprd_list_title">
                                            테팔 IT8460
                                        </strong>
                                        <div className="allprd_list_price_area">
                                            <strong className="allprd_list_price">
                                                <span className="price_num">169,000</span>
                                                <span className="price_text">원</span>
                                            </strong>
                                        </div>
                                        <p className="allprd_list_ptag">한국 정품 닌텐도 스위치 동물의 숲 에디션 새제품 ( 동물의 숲 타이틀은 포함되어 있지 않습니다 ) 기본 구성품</p>
                                    </a>
                                    
                                    <div className="area_flag">
                                        <div className="flag flag_new">NEW</div>
                                        <div className="flag flag_best">BEST</div>
                                    </div>

                                    <div className="allprd_list_estimation">
                                        <span className="allprd_list_estimation_text">리뷰</span>
                                        <span className="allprd_list_estimation_text2">10</span>
                                        <span className="allprd_list_estimation_text">평점</span>
                                        <span className="allprd_list_estimation_text2">
                                            4.6
                                            <span className="slash">/</span>
                                            5
                                        </span>
                                    </div>

                                    <div className="soldout_area">
                                        <div className="soldout">
                                            SOLDOUT
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;