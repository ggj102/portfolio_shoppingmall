import React from 'react';
import '../css/Products.css'
import Bc from '../img/bc.png'
import Citi from '../img/citi.png'
import Hana from '../img/hana.png'
import Hyundai from '../img/hyundai.png'
import Kb from '../img/kb.png'
import Kwang from '../img/kwang.png'
import Lotte from '../img/lotte.png'
import Nh from '../img/nh.png'
import Samsung from '../img/samsung.png'
import Shinhan from '../img/shinhan.png'


// 할부 관련 정보

function Installment({btn}){
    return(
        <div className="popup_card">
          <div className="inner_text">
            <strong className="popup_title">무이자 할부 카드 안내</strong>
            <button className="exit_btn" onClick={btn}>X</button>
            <div className="card_notice">
                <div className="symbolmark">법인카드 (개인사업자 카드포함)는 무이자 할부 혜택이 제공되지 않습니다.</div>
                <div className="symbolmark">BC카드의 경우 BC마크가 없는 경우 무이자 할부 혜택이 제공되지 않습니다.</div>
            </div>
            <ul>
                <li className="item_card">
                    <div className="bland_img"><img src={Kb} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3,4,5,6개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">10개월 부분무이자(1,2,3개월 고객부담)</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">12개월 부분무이자(1,2,3,4개월 고객부담)</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Samsung} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3,4,5,6개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">10개월 부분무이자(1,2,3개월 고객부담)</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">12개월 부분무이자(1,2,3,4개월 고객부담)</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Nh} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3,4,5,6개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Hyundai} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3,4,5,6,7개월 무이자</span>
                            <span className="card_price">1만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">10개월 무이자</span>
                            <span className="card_price">30만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Lotte} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3,4,5개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Hana} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3,4,5,6개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Shinhan} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">10개월 무이자</span>
                            <span className="card_price">30만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3,4,5,6개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자(</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">12개월 부분무이자(1,2,3,4개월 고객부담)</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Citi} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3,4,5,6개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Bc} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3,4,5,6개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
                <li className="item_card">
                    <div className="bland_img"><img src={Kwang} alt="img"/></div>
                    <div className="card_text_area">
                        <div className="card_text">
                            <span className="card_month">2,3개월 무이자</span>
                            <span className="card_price">5만원 이상</span>
                        </div>
                    </div>
                </li>
            </ul>
            <i className="line"></i>
            <p className="pop_info">
                판매자상품 무이자할부는 이 상품의 단독구매시에만 적용됩니다.
            </p>
          </div>
        </div>
    )
}

export default Installment;