import React from 'react';
import '../css/products.css'
import { NavLink } from 'react-router-dom';

function Products(){
    return(
        <div id="container">
            <div className=" _category_area h_area h_area_v2">
                <div className="loc">
                    <a href='#'>홈</a>
                        <span className="bar">{'>'}</span>
                    <a href='#' className="path">디지털/가전</a>
                    {/* 더보기 */}
                    <span className="bar">{'>'}</span>
                    <a href='#' className="path">게임기/타이틀</a>
                    {/* 더보기 */}
                    <span className="bar">{'>'}</span>
                    <span className="last_depth">
                        <a href='#' className="path">가정용게임기(총19개)</a>
                        {/* 더보기 */}
                    </span>
                </div>
            </div>
            <div id="content">
                <div className="_show_area">
                    <div className="prd_detail_basic">
                        <div className="_image view">
                            <div className="bimg">
                                <div className="img_va">
                                    {/* img태그를 씀
                                    mouseover 것에 이미지로 바뀜 */}
                                </div>
                                <div className="ico_goods"></div>
                            </div>

                            <div className="thumbnail_area thmb_lst more">
                                <span className="_image_box"></span>
                                <span className="_image_box"></span>
                                <span className="_image_box"></span>
                            </div>
                        </div>

                        <div className="info">
                            <div>
                                <div className="_copyable">
                                    <p className="_easy_purchase_hide_area prd_num">
                                        "상품번호 : "
                                        <span className="thm">4701618585</span>
                                    </p>
                                    <dl className="_easy_purchase_hide_area">
                                        <dt className="prd_name">
                                            <strong>소니 PS4 PRO 플레이스테이션4 +추가 듀얼쇼크4 2인셋트 블랙 화이트 정품.</strong>
                                            <em className="sub">플레이스테이션4 프로</em>
                                        </dt>
                                        <dd>
                                            <div className="area_cost">
                                                
                                                <strong className="info_cost">
                                                    <span className="thm">580,000</span>
                                                    원
                                                </strong>
                                            </div>
                                            <div className="installment">
                                                <div className="h">무이자할부</div>
                                                <a href="#" className="detailBtn">자세히보기</a>
                                            </div>
                                        </dd>
                                    </dl>
                                    <div className="delivery">
                                        <div className="delivery_way">
                                            <span>배송방법</span>
                                            <select>
                                                <option>택배</option>
                                            </select>
                                        </div>
                                        <div className="delivery_cost">
                                            <span className="delivery_cost_text">배송비</span>
                                            <div className="cost">
                                                <div className="cost_interval">무료<span>(제주 추가 4,000원, 제주 외 도서지역 추가 4,500원)</span></div>
                                                <div><a href="#" className="saving">배송비 절약상품보기</a></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prd_option">
                                        <div className="option">
                                            <span>옵션</span>
                                            <select>
                                                <option>본체 색상선택</option>
                                            </select>
                                        </div>

                                        <div className="add">
                                            <span>추가상품</span>
                                            <div className="select_area">
                                                <select>
                                                    <option>소니 정품 악세서리</option>
                                                </select>
                                                <select>
                                                    <option>스틱/악세서리</option>
                                                </select>
                                                <select>
                                                    <option>게임 타이틀</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="total">
                                        <span className="total_count">총 수량 0개</span>
                                        <span className="total_cost">
                                            총 상품금액
                                            <span>0원</span>
                                        </span>
                                    </div>

                                    <div className="btn_area">
                                        <div className="buy_btn">
                                            <a href="#">구매하기</a>
                                        </div>

                                        <div className="basket_btn">
                                            <a href="#">장바구니</a>
                                        </div>

                                        <div className="pick_btn">
                                            <a href="#">찜</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;