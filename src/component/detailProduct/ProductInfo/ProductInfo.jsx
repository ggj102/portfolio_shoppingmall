import React, { useState, useEffect } from "react";
import {} from "react";

export default function ProductInfo({ data }) {
  const [tabNum, setTabNum] = useState(0);
  const [qnaState, setQnaState] = useState("0");

  const [isProductInfoIo, setIsProductInfoIo] = useState(false);
  const [isQnaIo, setIsQnaIo] = useState(false);
  const [isExchangeIo, setIsExchangeIo] = useState(false);

  const productInfoIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setIsProductInfoIo(entry.isIntersecting));
  });

  const qnaIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setIsQnaIo(entry.isIntersecting));
  });

  const exchangeIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setIsExchangeIo(entry.isIntersecting));
  });

  useEffect(() => {
    const prdInfo = document.querySelector(".prd_info");
    const qna = document.querySelector(".qna");
    const returnExchange = document.querySelector(".return_exchange");

    productInfoIo.observe(prdInfo);
    qnaIo.observe(qna);
    exchangeIo.observe(returnExchange);
  }, []);

  useEffect(() => {
    const ioArr = [isProductInfoIo, isQnaIo, isExchangeIo];

    for (let i = 0; i < 3; i++) {
      if (ioArr[i]) {
        setTabNum(i);
        break;
      }
    }
  }, [isProductInfoIo, isQnaIo, isExchangeIo]);

  return (
    <div className="productInfoWrapper">
      <div className="tab_area">
        <a
          href="#id_prd_info"
          className={tabNum === 0 ? "info_tab_focus" : "info_tab"}
          onClick={() => setTabNum(0)}
        >
          상세정보
        </a>
        <a
          href="#id_qna"
          className={tabNum === 1 ? "info_tab_focus" : "info_tab"}
          onClick={() => setTabNum(1)}
        >
          {`Q&A`}
        </a>
        <a
          href="#id_return_exchange"
          className={tabNum === 2 ? "info_tab_focus" : "info_tab"}
          onClick={() => setTabNum(2)}
        >
          반품/교환정보
        </a>
      </div>
      <div id="id_prd_info" className="tabLink" />
      <div className="prd_info productInfoContents">
        <div className="infoWrapper">
          <div className="info_title">상품정보</div>
          <div className="displayGrid">
            {data.product_information.basic.map((arr, idx) => {
              return (
                <div key={`${arr.title}${idx}`}>
                  <div>{arr.title}</div>
                  <div>{arr.description}</div>
                </div>
              );
            })}
          </div>
          <div className="reportInfo">
            ※ 상품정보 관련 문의사항은 <a href="#qna"> {`Q&A`}</a>에 남겨주세요.
          </div>
          <div className="displayGrid">
            {data.product_information.additional.map((arr, idx) => {
              return (
                <div key={`${arr.title}${idx}`}>
                  <div>{arr.title}</div>
                  <div>{arr.description}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="infoWrapper">
          <div className="displayGrid oneColumnGrid">
            {data.product_information.etc.map((arr, idx) => {
              return (
                <div key={`${arr.title}${idx}`}>
                  <div>{arr.title}</div>
                  <div dangerouslySetInnerHTML={{ __html: arr.description }} />
                </div>
              );
            })}
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.product_more_information }}
        />
        <div className="test_interval"> </div>
        <div className="goods_tag">
          <h3>Tag</h3>
          <ul>
            {data.tag &&
              data.tag.map((arr, idx) => {
                return (
                  <li key={idx.toString()}>
                    <a href="#tag">#{arr}</a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="infoWrapper">
          <div className="info_title">상품정보 제공고시</div>
          <div className="displayGrid oneColumnGrid">
            {data.product_information_public.map((arr, idx) => {
              return (
                <div key={`${arr.title}${idx}`}>
                  <div>{arr.title}</div>
                  <div>{arr.description}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="infoWrapper">
          <div className="info_title">거래조건에 관한 정보</div>
          <div className="displayGrid oneColumnGrid">
            {data.trading_conditions.map((arr, idx) => {
              return (
                <div key={`${arr.title}${idx}`} className="tradeInfo">
                  <div>{arr.title}</div>
                  <div>{arr.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div id="id_qna" className="tabLink" />
      <div className="qna productInfoContents">
        <div className="qna_title_text">
          <h3> {`Q&A`}</h3>
          <p>
            구매하시려는 상품에 대해 궁금하신 점이 있으신 경우 문의해주세요.
            상품문의 이외에 배송/반품/교환 관련 문의는
            <a href="#question"> '판매자 문의하기'</a>를 이용해 주시기 바랍니다.
          </p>
        </div>
        <div className="qna_content">
          <div className="qna_header">
            <div className="qna_sort_area">
              <div className="select_sort">
                <select onChange={(e) => setQnaState(e.target.value)}>
                  <option value="0">답변상태</option>
                  <option value="1">답변대기</option>
                  <option value="2">답변완료</option>
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
                {data.qna.map((arr, idx) => {
                  return (
                    <li key={idx}>
                      {(qnaState === "0" ||
                        parseInt(qnaState) === arr.status) && (
                        <div className="qna_table">
                          <div className="qna_state">
                            <span className="list_item_text">
                              {arr.status === 1 ? "답변대기" : "답변완료"}
                            </span>
                          </div>
                          <div className="qna_title">
                            <span className="list_item_text">
                              {arr.secret ? "비밀글입니다." : arr.title}
                            </span>
                          </div>
                          <div className="qna_author">
                            <span className="list_item_text">{arr.writer}</span>
                          </div>
                          <div className="qna_date">
                            <span className="list_item_text">{arr.date}</span>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="list_paging">
              <strong>1</strong>
            </div>
          </div>
        </div>
      </div>
      <div id="id_return_exchange" className="tabLink" />
      <div className="return_exchange productInfoContents">
        <div className="exchange_title">
          <h3>반품/교환정보</h3>
        </div>
        <div className="exchange_guide">
          <div className="infoWrapper">
            <div className="info_title">반품/교환 안내</div>
            <div>
              반품/교환에 관한 일반적인 사항은 판매자 제시사항보다 관계법령이
              우선합니다.
            </div>
            <div className="displayGrid oneColumnGrid exchangeInfo">
              <div>
                <div>판매자 지정택배사</div>
                <div>{data.return_exchange.delivery}</div>
              </div>
              <div>
                <div>반품배송비</div>
                <div>{data.return_exchange.return_price}</div>
              </div>
              <div>
                <div>교환배송비</div>
                <div>{data.return_exchange.exchange_price}</div>
              </div>
              <div>
                <div>보내실 곳</div>
                <div>{data.return_exchange.address}</div>
              </div>
            </div>
          </div>
          <div className="guide_title">
            반품/교환 사유에 따른 요청 가능 기간
            <p>
              반품 시 먼저 판매자와 연락하셔서 반품 사유,택배사,배송비,반품지
              주소 등을 협의하신 후 반품상품을 발송해 주시기 바랍니다.
            </p>
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
                표시/광고와 상이, 상품하자의 경우 상품 수령 후 3개월 이내 혹은
                표시/광고와 다른 사실을 안 날로부터 30일 이내
                <br />둘 중 하나 경과 시 반품/교환 불가
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
                <em>
                  (단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는
                  제외)
                </em>
              </li>
              <li>
                <span className="guide_text_num">3</span>
                구매자의 책임있는 사유로 포장이 훼손되어 상품 가치가 현저히
                상실된 경우
                <em> (예: 식품,화장품,향수류,음반 등)</em>
              </li>
              <li>
                <span className="guide_text_num">4</span>
                구매자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히
                감소한 경우
                <em>
                  (라벨이 떨어진 의류 또는 태그가 떨어진 명품관 상품인 경우)
                </em>
              </li>
              <li>
                <span className="guide_text_num">5</span>
                시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가
                현저히 감소한 경우
              </li>
              <li>
                <span className="guide_text_num">6</span>
                고객의 요청사항에 맞춰 제작에 들어가는 맞춤제작상품의 경우
                <em>
                  (판매자에게 회복불가능한 손해가 예상되고,그러한 예정으로
                  청약철회권 행사가 불가능하다는 사실을 서면 동의 받은 경우)
                </em>
              </li>
              <li>
                <span className="guide_text_num">7</span>
                복제가 가능한 상품 등의 포장을 훼손한 경우
                <em> (CD/DVD/GAME/도서의 경우 포장 개봉 시)</em>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="seller_info">
        <div className="seller">
          <div className="seller_name">
            <span className="seller_name_blank"></span>
            <strong>판매자정보</strong>
            <span className="seller_name_bar">|</span>
            {data.seller_info.title}
            <span className="seller_name_bar">|</span>
            상호명 : {data.seller_info.name}
            <em> {data.seller_info.subname}</em>
            <span className="seller_name_bar">|</span>
            대표자 : {data.seller_info.ceo}
          </div>
          <div className="seller_detail_info">
            사업자등록번호 : {data.seller_info.business_number}
            <br />
            통신판매업번호 : {data.seller_info.mail_order_number}
            <br />
            사업장소재지 : {data.seller_info.address}
            <br />
            고객센터 : {data.seller_info.phone_number}
            <br />
            메일 : {data.seller_info.email}
          </div>
        </div>
      </div>
    </div>
  );
}
