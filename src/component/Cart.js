import React, { useEffect, useState } from 'react';
import '../css/Cart.css'
import Axios from 'axios';

function Cart()
{
    const [cartData,setCartData] = useState({});
    const [cartList,setCartList] = useState([]);
    const [listLength,setListLength] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [prdTotal,setPrdTotal] = useState(0);
    const [checkItem,setCheckItem] = useState([]);
    const [checkCount,setChcekCount] = useState(0);
    const [deliveryprice,setDeliveryprice] = useState(0);

    useEffect(()=>{
        Axios.get(process.env.PUBLIC_URL+'/CartData.json').then((response)=>{
            setCartData(response.data);
            setCartList(response.data.product_list);
            setListLength(response.data.product_list.length);
            totalCal();
        })
    },[checkItem])

    const onAllCheck = () =>{
        if(checkCount !== listLength)
        {
            setChcekCount(listLength);
            setCheckItem(cartList);
        }
        else{
            setChcekCount(0)
            setCheckItem([]);
        } 
    }

    const checkPrdDel = () =>{

     const deleteConfirm = window.confirm("선택하신 "+checkItem.length+"개 상품을 장바구니에서 삭제하시겠습니까?");
        // if(checkCount === listLength)
        // {
        //     setCartData({...cartData,total_delivery_price:0}); // 임시
        //     setPrdTotal(0);
        //     setTotalPrice(0);
        //     setChcekCount(0);
        //    return setCartList([]);
        // }
        
        if(deleteConfirm)
        {
            const filter = cartList.filter((arr)=>{
            
                let pass = 0;
    
                for(let i = 0; i<checkItem.length; i++)
                {
                    if(checkItem[i].id === arr.id)
                    {
                        pass = checkItem[i].id;
                    }
                }
    
                return pass !== arr.id;
            })
            
            setCartList(filter);
            setChcekCount(0);
        }

        return;
    }

    const totalCal = () =>{
        const copylist = [...checkItem];
        let min = 0;

        if(copylist.length > 0)
        {
            min = copylist[0].delivery_price;
            for(let i = 0; i<copylist.length; i++)
            {
                if(min <= copylist[i].delivery_price)
                {
                    setDeliveryprice(min);
                }
                else{
                    min = copylist[i].delivery_price;
                    setDeliveryprice(min);
                }
            }
        }
        else{
            min = 0;
            setDeliveryprice(0)
        }

        const totalprice = copylist.reduce((acc,value)=>{
            return acc+value.price;
        },0)

        setTotalPrice(totalprice+min);
        setPrdTotal(totalprice);
    }

    const checklist = (id) =>{
       const list = [...cartList];

       const  checkFilter = list.filter((arr)=>{
            return arr.id === id;
        })

        const unCheckFilter = checkItem.filter((arr)=>{
            return arr.id === checkFilter[0].id;
        })

        if(unCheckFilter.length === 0)
        {
            setCheckItem([...checkItem,checkFilter[0]]);
            setChcekCount(checkCount+1)
        }
        else{
            const removeFilter = checkItem.filter((arr)=>{
                return arr.id !== unCheckFilter[0].id;
            })
            setCheckItem(removeFilter);
            setChcekCount(checkCount-1)
        }
    }

    const itemListMap = cartList.map((arr,index)=>{
        return(
                <tr>
                <td className="cart_item_cell">
                    <input type="checkbox" 
                           onClick={()=>checklist(arr.id)} 
                           checked={checkItem.filter((filarr)=>{
                                        return filarr.id === arr.id}).length === 0 ? false : true}/>
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

                {index === 0 && <td rowSpan={listLength} className="cart_item_cell">
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
                            <th scope="col" className="table_title_part"><input type="checkbox" onClick={onAllCheck} checked={checkCount === listLength ? true : false}/></th>
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
                        <div className="checkbox_input"><input type="checkbox" onClick={onAllCheck} checked={checkCount === listLength ? true : false}/></div>
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
                            <span className="prd_price_total_num_text">{totalPrice}</span>
                            원
                        </span>
                    </div>
                </div>

                <div className="cart_button_box">
                    <a href="#" className="link_home">쇼핑 계속하기</a>
                    <button>주문하기</button>
                </div>
            </div> :
                
                <div className="cart_empty">
                    <p className="cart_empty_text1">장바구니에 담긴 상품이 없습니다.</p>
                    <p className="cart_empty_text2">원하는 상품을 장바구니에 담아보세요.</p>
                    <a href="#" className="link_home">쇼핑 계속하기</a>
                </div>
            }
        </div>
    )
}

export default Cart;