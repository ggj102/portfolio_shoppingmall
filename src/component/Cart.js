import React from 'react';
import '../css/Cart.css'

function Cart()
{
    const tarr = [1,2,3,4];

    const itemListMap = tarr.map((arr)=>{
        return(
                <tr>
                <td className="cart_item_cell"><input type="checkbox"/></td>

                <td className="cart_item_cell">
                    <div className="prd_desc">
                        <div className="prd_description">
                            <span className="prd_thumb">
                                <img src=""  alt="img"/>
                            </span>
                            <a href="#" className="prd_mall_name">시온스토어</a>
                            <span className="prd_channel_name">스마트스토어</span>
                            <span className="prd_name">로데 VideoMic Me-L</span>
                            <span className="prd_price_area">
                                <div className="prd_price_sale">
                                    110,000
                                    <span className="price_text">원</span>
                                </div>
                            </span>
                            <span className="prd_delivery_area">
                                <em className="prd_delivery_date">9. 1.(화) </em>
                                도착확률95%
                            </span>
                        </div>
                    </div>
                    <div className="prd_btn_area">
                        <button>X</button>
                    </div>
                </td>

                <td className="cart_item_cell valign_top">
                    <div className="prd_option_area">
                        <div className="prd_option_wrap">
                            <div className="prd_option_text">상품 주문 수량 : 1개</div>
                            <div className="prd_option_box">
                                <button>주문조건 추가/변경</button>
                            </div>
                        </div>
                    </div>
                </td>

                <td className="cart_item_cell">
                    <div className="item_prd_price">
                        <em className="item_prd_price_em">
                            110,000
                            <span>원</span>
                        </em>
                        <span className="item_prd_delivery_text">(배송비 무료)</span>
                        <div className="item_prd_button_box">
                            <button>주문하기</button>
                        </div>
                    </div>
                </td>

                <td className="cart_item_cell">
                    <div className="delivery_free">
                        <div className="delivery_free_price">
                            <span className="delivery_free_price_text">무료</span>
                            <div className="delivery_free_blank"></div>
                        </div>

                        <div className="delivery_free_text_area">
                            <span className="icon_today">오늘출발</span>
                            <span className="delivery_free_text">
                                15:00까지 결제 시
                                <em>오늘 바로 발송</em>
                            </span>
                        </div>
                        <div className="delivery_comment">
                            판매자 설정에 따라
                            <br/>
                            상품별 배송비가 개별
                            <br/>
                            발생됩니다.
                        </div>
                    </div>
                </td>
            </tr>
        )
    })

    return(
        <div className="cart_body">
            <table className="cart_table">
                <thead>
                    <tr className="table_title">
                        <th scope="col" className="table_title_part"><input type="checkbox"/></th>
                        <th scope="col" className="table_title_part">상품정보</th>
                        <th scope="col" className="table_title_part">옵션</th>
                        <th scope="col" className="table_title_part">상품금액</th>
                        <th scope="col" className="table_title_part">배송비</th>
                    </tr>
                </thead>
                <tbody>
                    {itemListMap}
                </tbody>
            </table>

            <div className="prd_check_btn_area">
                    <div className="checkbox_input"><input type="checkbox"/></div>
                    <button>선택상품 삭제</button>
            </div>

            <div className="order_calculator">
                <div className="prd_price_detail">
                    <dl className="prd_price_detail_text_area">
                        <dt>총 상품금액</dt>
                        <dd>
                        <span className="prd_price_detail_text1">0</span>    
                            원
                        </dd>
                    </dl>

                    <span className="order_calculator_mark">+</span>

                    <dl className="prd_price_detail_text_area">
                        <dt>배송비</dt>
                        <dd>
                        <span className="prd_price_detail_text1">0</span>    
                            원
                        </dd>
                    </dl>

                    <span className="order_calculator_mark">-</span>

                    <dl className="prd_price_detail_text_area">
                        <dt>할인예상금액</dt>
                        <dd className="discount_text">
                        <span className="prd_price_detail_text1">0</span>    
                            원
                        </dd>
                    </dl>
                </div>

                <div className="prd_price_total">
                    <span className="prd_price_total_text">총 주문금액</span>
                    <span className="prd_price_total_num">
                        <span className="prd_price_total_num_text">0</span>
                        원
                    </span>
                </div>
            </div>

            <div className="cart_button_box">
                <a href="#" className="link_home">쇼핑 계속하기</a>
                <button>주문하기</button>
            </div>
        </div>
    )
}

export default Cart;