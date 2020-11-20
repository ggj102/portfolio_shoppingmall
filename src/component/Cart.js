import React, { useEffect, useState } from 'react';
import '../css/Cart.css'
import { NavLink } from 'react-router-dom';
import { CartDataAxios, CartListDeleteAxios } from './common/api.js';

function Cart()
{
    const [cartData,setCartData] = useState({});
    const [cartList,setCartList] = useState([]);
    const [prdTotal,setPrdTotal] = useState(0);
    const [checkItem,setCheckItem] = useState([]);
    const [checkCount,setChcekCount] = useState(0);
    const [deliveryprice,setDeliveryprice] = useState(0);

    const cartDataGet = () =>{
        CartDataAxios().then((response)=>{
            setCartData(response.data);
            setCartList(response.data.product_list);
        })
    }

    useEffect(()=>{
        cartDataGet();
    },[])

    useEffect(()=>{
        totalCal();
    },[checkItem])

    // 체크박스 all check 기능
    const onAllCheck = () =>{
        if(checkCount !== cartList.length)
        {
            setChcekCount(cartList.length);
            setCheckItem(cartList);
        }
        else{
            setChcekCount(0)
            setCheckItem([]);
        } 
    }

    // 체크한 상품을 삭제하는 기능
    const checkPrdDel = () =>{

        const deleteConfirm = window.confirm("선택하신 "+checkItem.length+"개 상품을 장바구니에서 삭제하시겠습니까?");
        
        if(deleteConfirm)
        {
            const removeId = checkItem.map((arr)=>{
                return arr.cart_id;
            })

            CartListDeleteAxios(removeId).then(()=>{
                setCheckItem([]);
                setChcekCount(0);
                cartDataGet();
            })
        }
        return;
    }

    // checkItem에 있는 상품들의 가격 및 배송비를 계산하는 기능
    const totalCal = () =>{
        const copylist = [...checkItem];
        let min = 0;

        if(copylist.length > 0)
        {
            min = copylist[0].delivery_price;
            for(let i = 1; i<copylist.length; i++)
            {
                if(min > copylist[i].delivery_price)
                {
                    min = copylist[i].delivery_price;
                }
            }
        }
  
        const totalprice = copylist.reduce((acc,value)=>{
            return acc+value.price;
        },0)

        setDeliveryprice(min)
        setPrdTotal(totalprice);
    }

    // 상품 체크박스를 체크하면 checkItem로 set하여 보관하며 
    // checkItem에 있을 경우 삭제
    const checklist = (cartId) =>{
        const list = [...cartList];

        const checkFind = list.find((arr)=>{
            return arr.cart_id === cartId;
        })

        const unCheckFind = checkItem.find((arr)=>{
            return arr.cart_id === checkFind.cart_id;
        })

        if(!unCheckFind)
        {
            setCheckItem([...checkItem,checkFind]);
            setChcekCount(checkCount+1)
        }
        else{
            const removeFilter = checkItem.filter((arr)=>{
                return arr.cart_id !== unCheckFind.cart_id;
            })
            setCheckItem(removeFilter);
            setChcekCount(checkCount-1)
        }
    }

    // 장바구니 상품 리스트 맵
    const itemListMap = cartList.map((arr,index)=>{
        return(
                <tr key={arr.cart_id}>
                <td className="cart_item_cell">
                    <input type="checkbox" 
                           onChange={()=>checklist(arr.cart_id)} 
                           checked={checkItem.find((findarr)=>{
                                        return findarr.cart_id === arr.cart_id})}/>
                </td>
                <td className="cart_item_cell">
                    <div className="prd_desc">
                        <div className="prd_description">
                            <span className="prd_thumb">
                                <img src={arr.thumb}  alt="img"/>
                            </span>
                            <a href="#" className="prd_mall_name">시온스토어</a>
                            <span className="prd_channel_name">스마트스토어</span>
                            <span className="prd_name">{arr.title}</span>
                            <span className="prd_price_area">
                                <div className="prd_price_sale">
                                    {arr.price}
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
                            <div className="prd_option_text">{arr.option ? arr.option : "상품 주문 수량 : 1개"}</div>
                            <div className="prd_option_box">
                                <button>주문조건 추가/변경</button>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="cart_item_cell">
                    <div className="item_prd_price">
                        <em className="item_prd_price_em">
                            {arr.price}
                            <span>원</span>
                        </em>
                        <span className="item_prd_delivery_text">(배송비 {arr.delivery_price ? arr.delivery_price+"원" : "무료"})</span>
                        <div className="item_prd_button_box">
                            <button>주문하기</button>
                        </div>
                    </div>
                </td>
                {index === 0 && <td rowSpan={cartList.length} className="cart_item_cell">
                    <div className="delivery_free">
                        <div className="delivery_free_price">
                            <span className="delivery_free_price_text">
                                {cartData.total_delivery_price === 0 ? "무료" : cartData.total_delivery_price+"원"}
                            </span>
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
                </td>}
            </tr>
        )
    })

    return(
        <div className="cart_body">
          { cartList.length > 0 ? <div>
                <table className="cart_table">
                    <thead>
                        <tr className="table_title">
                            <th scope="col" className="table_title_part"><input type="checkbox" onChange={onAllCheck} checked={checkCount === cartList.length}/></th>
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
                        <div className="checkbox_input"><input type="checkbox" onChange={onAllCheck} checked={checkCount === cartList.length}/></div>
                        <button onClick={checkPrdDel}>선택상품 삭제</button>
                </div>
                <div className="order_calculator">
                    <div className="prd_price_detail">
                        <dl className="prd_price_detail_text_area">
                            <dt>총 상품금액</dt>
                            <dd>
                            <span className="prd_price_detail_text1">{prdTotal}</span>    
                                원
                            </dd>
                        </dl>
                        <span className="order_calculator_mark">+</span>
                        <dl className="prd_price_detail_text_area">
                            <dt>배송비</dt>
                            <dd>
                            <span className="prd_price_detail_text1">{deliveryprice}</span>    
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
                            <span className="prd_price_total_num_text">{prdTotal+deliveryprice}</span>
                            원
                        </span>
                    </div>
                </div>
                <div className="cart_button_box">
                    <NavLink to='/' className="link_home">쇼핑 계속하기</NavLink>
                    <button>주문하기</button>
                </div>
            </div> :
                <div className="cart_empty">
                    <p className="cart_empty_text1">장바구니에 담긴 상품이 없습니다.</p>
                    <p className="cart_empty_text2">원하는 상품을 장바구니에 담아보세요.</p>
                    <NavLink to='/' className="link_home">쇼핑 계속하기</NavLink>
                </div>
            }
        </div>
    )
}

export default Cart;