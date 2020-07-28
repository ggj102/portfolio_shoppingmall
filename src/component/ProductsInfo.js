import React from 'react';

function ProductsInfo({data})
{
    const prdInfoData = {...data.product_information};
    const prdInfobasic = data.product_information;

    // const prdInfoMap = prdInfobasic.map((arr)=>{
    //     return(
    //         <tr>
    //             <th scope="row">
    //                 <span>{arr.title}</span>
    //             </th>
    //             <td><span>{arr.description}</span></td>
    //         </tr>
    //     )
    // })

    return(
        <div className="detail_info">
            {console.log(prdInfobasic)}
            <div className="tab_area">
                <div className="info_tab">
                    <a href="#">상세정보</a>
                </div>
                <div className="info_tab">
                    <a href="#">Q{'&'}A</a>
                </div>
                <div className="info_tab last_tab">
                    <a href="#">반품/교환정보</a>
                </div>
            </div>

            <div className="prd_info">
                <div className="info_area">
                    <div className="info_title">상품정보</div>
                    <div>
                        <table cellPadding="0" className="info_table">
                        {/* <tr>
                                <th scope="row">
                                    <span>상품상태</span>
                                </th>
                                <td><span>새상품</span></td>

                                <th scope="row">
                                    <span>상품번호</span>
                                </th>
                                <td><span>00000000</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>제조사</span>
                                </th>
                                <td><span>소니</span></td>

                                <th scope="row"><span>브랜드</span></th>
                                <td><span>소니</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>모델명</span>
                                </th>
                                <td><span>플레이스테이션4</span></td>

                                <th scope="row"><span>원산지</span></th>
                                <td><span>일본산</span></td>
                        </tr> */}
                        {/* {prdInfoMap.lenght ? prdInfoMap : ''} */}
                        </table>
                        <div className="report_info">
                            ※ 상품정보 관련 문의사항은 <a href="#">Q{'&'}A</a>에 남겨주세요.
                        </div>
                    </div>
                </div>

                <div className="info_area">
                    <table className="info_table">
                    <tr>
                        <th scope="row">
                                    <span>기종</span>
                                </th>
                                <td><span>PS4</span></td>

                                <th scope="row">
                                    <span>품목</span>
                                </th>
                                <td><span>게임기</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>네트워크</span>
                                </th>
                                <td><span>유선랜,무선랜n,블루투스4.0</span></td>

                                <th scope="row"><span>해상도</span></th>
                                <td><span>1080p</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>CPU</span>
                                </th>
                                <td><span>옥타코어</span></td>

                                <th scope="row"><span>램</span></th>
                                <td><span>8기가</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>그래픽</span>
                                </th>
                                <td><span>라데온</span></td>

                                <th scope="row"><span>HDD</span></th>
                                <td><span>1테라</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>재생</span>
                                </th>
                                <td><span>DVD, 블루레이</span></td>

                                <th scope="row"><span>부가기능</span></th>
                                <td><span>너무 많음</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>소비전력</span>
                                </th>
                                <td colSpan="3"><span>최대300W</span></td>
                        </tr>
                    </table>
                </div>

                <div className="info_area">
                    <table className="info_table">
                            <tr>
                                <th scope="row">
                                    <span>영수증발급</span>
                                </th>
                                <td colSpan="3"><span>신용카드전표,현금영수증 발급</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>A/S안내</span>
                                </th>
                                <td colSpan="3"><span>너무 길어</span></td>
                            </tr>    
                    </table>
                </div>

                {/* 상품상세정보 */}

                <div className="test_interval"> </div>

                <div className="goods_tag">
                    <h3>Tag</h3>
                    <ul>
                        <li><a href="#">#PS4</a></li>
                        <li><a href="#">#플스게임</a></li>
                        <li><a href="#">#플스타이틀</a></li>
                        <li><a href="#">#플레이스테이션4</a></li>
                        <li><a href="#">#플스악세사리</a></li>
                        <li><a href="#">#ps4신형</a></li>
                    </ul>
                </div>

                <div className="info_area">
                    <div className="info_title">상품정보 제공고시</div>
                    <table className="info_table">
                            <tr>
                                <th scope="row">
                                    <span>품명 / 모델명</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조 / 상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>KC 인증 필 유무</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>정격전압</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>소비전력</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>동일모델의 출시 연월</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>제조자</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>제조국</span>
                                </th>
                                <td colSpan="3"><span>일본산</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>크기</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>무게</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>주요 사양</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>품질보증기준</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>A/S 책임자와 전화번호</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조(00-0000-0000)</span></td>
                            </tr>
                    </table>
                </div>

                <div className="info_area">
                    <div className="info_title">거래조건에 관한 정보</div>
                    <table className="info_table">
                            <tr>
                                <th scope="row">
                                    <span>재화등의 배송방법에 관한 정보</span>
                                </th>
                                <td><span>상품상세 참조 / 상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>주문 이후 예상되는 배송기간</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>제품하자·오배송 등에 따른 청약철회 등의 경우 청약철회 등을 할 수 있는 기간 및 통신판매업자가 부담하는 반품비용 등에 관한 정보</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>제품하자가 아닌 소비자의 단순변심, 착오구매에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>재화등의 교환·반품·보증 조건 및 품질보증기준</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>재화등의 A/S 관련 전화번호</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>대금을 환불받기 위한 방법과 환불이 지연될 경우 지연에 따른 배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적 조건 및 절차</span>
                                </th>
                                <td><span>일본산</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>소비자피해보상의 처리, 재화등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁처리에 관한 사항</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>거래에 관한 약관의 내용 또는 확인할 수 있는 방법</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>
                    </table>
                </div>
            </div>

            {/* Q&A */}

            <div className="qna">
                <div className="qna_title_text">
                    <h3>Q{'&'}A</h3>
                    <p>구매하시려는 상품에 대해 궁금하신 점이 있으신 경우 문의해주세요. 상품문의 이외에 배송/반품/교환 관련 문의는 
                        <a href="#"> '판매자 문의하기'</a>를 이용해 주시기 바랍니다.
                    </p>
                </div>

                <div className="qna_content">
                    <div className="qna_header">
                        <div className="qna_btn_area">
                            <a href="#" className="qna_btn qna_write">상품 Q{'&'}A 작성하기</a>
                            <a href="#" className="qna_btn qna_arrow">판매자 문의하기 {'>'}</a>
                        </div>

                        <div className="qna_sort_area">
                            <div className="area_switch">
                                <label class="qna_label" for="qnaSwitch">
                                    <span>내 Q{'&'}A 보기</span>
                                </label>
                                <input type="checkbox" id="qnaSwitch" className="qna_checkbox"/>
                            </div>

                            <div className="select_sort">
                                <select>
                                    <option>답변상태</option>
                                    <option>미답변</option>
                                    <option>답변완료</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="qna_list">
                        <div className="qna_table">
                            <div className="qna_state">
                                <span className="list_header_text">답변상태</span>
                            </div>

                            <div className="qna_title">
                                <span className="list_header_text">제목</span>
                            </div>

                            <div className="qna_author">
                                <span className="list_header_text">작성자</span>
                            </div>

                            <div className="qna_date">
                                <span className="list_header_text">작성일</span>
                            </div>
                        </div>

                        <div className="qna_list_area">
                            <ul>
                                <li>
                                    <div className="qna_table">
                                        <div className="qna_state">
                                            <span className="list_item_text">미답변</span>
                                        </div>

                                        <div className="qna_title">
                                            <span className="list_item_text">비밀글입니다.</span>
                                        </div>

                                        <div className="qna_author">
                                            <span className="list_item_text">naver****</span>
                                        </div>

                                        <div className="qna_date">
                                            <span className="list_item_text">2020.07.28</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="list_paging"> 
                            <strong>1</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* 반품/교환정보 */}

            <div className="return_exchange">
                <div className="exchange_title">
                    <h3>반품/교환정보</h3>
                </div>
                <div className="exchange_guide">
                    <div className="guide_title">
                        Mania 반품/교환 안내
                        <p>반품/교환에 관한 일반적인 사항은 판매자 제시사항보다 관계법령이 우선합니다.</p>
                    </div>
                    <table cellPadding="0" border="1" className="info_table">
                        <tr>
                            <th scope="row">
                                <span>판매자 지정택배사</span>
                            </th>
                            <td colSpan="3"><span>CJ대한통운</span></td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <span>반품배송비</span>
                            </th>
                            <td><span>편도 5,000원 (최초 배송비 무료인 경우 10,000원 부과)</span></td>

                            <th scope="row">
                                <span>교환배송비</span>
                            </th>
                            <td><span>5,000원</span></td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <span>보내실 곳</span>
                            </th>
                            <td colSpan="3"><span>(우 : 03998) 서울특별시 마포구 성미산로 48-1 (대명빌딩) 4층 매니아</span></td>
                        </tr>
                    </table>

                    <div className="guide_title">
                        반품/교환 사유에 따른 요청 가능 기간
                        <p>반품 시 먼저 판매자와 연락하셔서 반품 사유,택배사,배송비,반품지 주소 등을 협의하신 후 반품상품을 발송해 주시기 바랍니다.</p>
                    </div>
                    <div className="guide_text">
                        <ol>
                            <li>
                                <span className="guide_text_num">1</span>
                                구매자 단순 변심은 상품 수령 후 7일 이내
                                <em> (구매자 반품배송비 부담)</em>
                            </li>

                            <li>
                                <span className="guide_text_num">2</span>
                                표시/광고와 상이, 상품하자의 경우 상품 수령 후 3개월 이내 혹은 표시/광고와 다른 사실을 안 날로부터 30일 이내<br/>
                                둘 중 하나 경과 시 반품/교환 불가
                                <em> (판매자 반품배송비 부담)</em>
                            </li>
                        </ol>
                    </div>

                    <div className="guide_title">
                        반품/교환 불가능 사유
                        <p>아래와 같은 경우 반품/교환이 불가능 합니다.</p>
                    </div>

                    <div className="guide_text">
                        <ol>
                            <li>
                                <span className="guide_text_num">1</span>
                                반품요정기간이 지난 경우
                            </li>

                            <li>
                                <span className="guide_text_num">2</span>
                                구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우
                                <em> (단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)</em>
                            </li>

                            <li>
                                <span className="guide_text_num">3</span>
                                구매자의 책임있는 사유로 포장이 훼손되어 상품 가치가 현저히 상실된 경우
                                <em> (예: 식품,화장품,향수류,음반 등)</em>
                            </li>

                            <li>
                                <span className="guide_text_num">4</span>
                                구매자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우
                                <em> (라벨이 떨어진 의류 또는 태그가 떨어진 명품관 상품인 경우)</em>
                            </li>

                            <li>
                                <span className="guide_text_num">5</span>
                                시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우
                            </li>

                            <li>
                                <span className="guide_text_num">6</span>
                                고객의 요청사항에 맞춰 제작에 들어가는 맞춤제작상품의 경우
                                <em> (판매자에게 회복불가능한 손해가 예상되고,그러한 예정으로 청약철회권 행사가 불가능하다는 사실을 서면 동의 받은 경우)</em>
                            </li>

                            <li>
                                <span className="guide_text_num">7</span>
                                복제가 가능한 상품 등의 포장을 훼손한 경우
                                <em> (CD/DVD/GAME/도서의 경우 포장 개봉 시))</em>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

            {/* 판매자정보 */}

            <div className="seller_info">
                <div className="seller">
                    <div className="seller_name">
                        <span className="seller_name_blank"></span>
                        <strong>판매자정보</strong>
                        <span className="seller_name_bar">|</span>
                        Mania
                        <span className="seller_name_bar">|</span>
                        상호명 : 매니아
                        <em> (사업자/개인사업자)</em>
                        <span className="seller_name_bar">|</span>
                        대표자 : 이태웅
                    </div>

                    <div className="seller_detail_info">
                        사업자등록번호 : 00000000
                        <br/>
                        통신판매업번호 : 2015-서울영등포-0748
                        <br/>
                        사업장소재지 : (우 : 00000) 서울특별시 용산구 원효로 128 e-테크벨리오피스텔 907호
                        <br/>
                        고객센터 : 00-0000-0000
                        <br/>
                        메일 : ggj102@naver.com
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductsInfo

