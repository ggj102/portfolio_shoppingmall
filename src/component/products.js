import React, { useEffect, useState } from 'react';
import '../css/Products.css'
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

function Products(){

    const [prdData,setPrdData] = useState([]);
    const [categoryList,setCategoryList] = useState([])
    const [deliveryMethod,setDeliveryMethod] = useState([]);
    const [prdImg,setPrdImg] = useState([])
    const [saleInfo,setSaleInfo] = useState([]);
    const [prdOption,setPrdOption] = useState([])
    const [addPrd,setAddPrd] = useState([])
    const [deliverySelValue,setDeliverySelValue] = useState("1")
    const [optionSelValue,setOptionSelValue] = useState()
    
    const {category_list,product_code,product_name,product_price} = prdData;

    

    useEffect(()=>{
        Axios.get(process.env.PUBLIC_URL+'/ProductsData.json').then((response)=>{
            console.log(response.data);
            setPrdData(response.data);
            setCategoryList(response.data.category_list);
            setPrdImg(response.data.product_image);
            setSaleInfo(response.data.sale_info);
            setDeliveryMethod(response.data.delivery_method);
            setPrdOption(response.data.option);
            setAddPrd(response.data.add_product);
            console.log('테스트');
        })
    },[])

    const onDeliverySel=(e)=>{
        console.log(e);
        setDeliverySelValue(e.target.options[e.target.selectedIndex].value);
    }

    const deliverySel = deliveryMethod.map((arr)=>{
        return <option value={arr.id}>{arr.name}</option>
    })
    
    return(
        <div id="container">
            <div className=" _category_area h_area h_area_v2">
                <div className="loc">
                    <NavLink to="/">홈</NavLink>
                        <span className="bar">{'>'}</span>
                    {
                        categoryList.map((list,num)=>{
                            if(categoryList.length === num+1)
                            {
                              return <NavLink to={"/category/"+list.id}>{list.name}(총{list.num}개)</NavLink>
                            }
                            else{
                                return (
                                    <>
                                    <NavLink to={"/category/"+list.id}>{list.name}</NavLink>
                                    <span className="bar">{'>'}</span>
                                    </>)}
                            })
                    }
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
                                        <span className="thm">{product_code}</span>
                                    </p>
                                    <dl className="_easy_purchase_hide_area">
                                        <dt className="prd_name">
                                            <strong>{product_name}</strong>
                                            <em className="sub">플레이스테이션4 프로</em>
                                        </dt>
                                        <dd>
                                            <div className="area_cost">
                                                <strong className="info_cost">
                                                    {console.log(saleInfo)}
                                                    <span className="price">{product_price}<span>원</span></span>
                                                    {saleInfo.length !== 0 ?
                                                        <> 
                                                        <span className="dc">{saleInfo.discount_percent}</span>
                                                        <span className="ori">{saleInfo.original_price}<span>원</span></span>
                                                        </> : ''
                                                    }
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
                                            {
                                                deliveryMethod.length === 1 ? 
                                                <span className="text_delivery">택배</span>
                                                : <select onChange={onDeliverySel}>
                                                    {deliverySel};
                                                  </select>}
                                        </div>
                                        {deliverySelValue === "1" ?                            
                                        <div className="delivery_cost">
                                            <span className="delivery_cost_text">배송비</span>
                                            <div className="cost">
                                                <div className="delivery_price">{ (deliveryMethod.length && deliveryMethod[0].price) === 0 ? '무료' : deliveryMethod.length && deliveryMethod[0].price+'원'}</div>
                                                <div className="interval">{deliveryMethod.length && deliveryMethod[0].additional_description}</div>
                                                <div><a href="#" className="saving">배송비 절약상품보기</a></div>
                                            </div>
                                        </div> : ''}
                                    </div>

                                    <div className="prd_option">
                                        <div className="option">
                                            <span>옵션</span>
                                            {
                                                prdOption.map((option_item) => {
                                                    return (
                                                        <select>
                                                            <option value={option_item.id}>{option_item.name}</option>
                                                            {
                                                                option_item.option_list.map((list)=>{
                                                                    return <option value={list.id}>{list.name}</option>
                                                                })
                                                            }
                                                        </select>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className="add">
                                            <span>추가상품</span>
                                            <div className="select_area">
                                                {
                                                    addPrd.map((addItem) => {
                                                        return (
                                                            <select>
                                                                <option value={addItem.id}>{addItem.name}</option>
                                                                {
                                                                    addItem.product_list.map((list)=>{
                                                                        return <option value={list.id}>{list.name} {list.price}원+</option>
                                                                    })
                                                                }
                                                            </select>
                                                        )
                                                    })
                                                }
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