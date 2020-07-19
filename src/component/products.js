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
    const [optionListArr,setOptionListArr] = useState([]);
    const [addPrdListArr,setAddPrdListArr] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    
    const {product_code,product_name,product_price} = prdData;

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
        })
    },[])

    const onOptionValue = (data,e) =>{
        const ReselectionFilter = optionListArr.filter((arr)=>{
            return arr[0].data_id === data;
        })
        
        const ReselectionFilter2 = ReselectionFilter.filter((arr)=>{
            return arr[0].id === parseInt(e.target.value);
        })

        if(ReselectionFilter2.length)
        {
            return alert('이미 선택한 옵션입니다.');
        }

        if(e.target.value !== '0')
        {
            const copy = [...prdOption]
            const prdFilter = copy.filter((arr)=>{
                return  arr.id === data
            })
         
            const list = prdFilter[0].option_list;
    
            const prdFilter2 = list.filter((arr)=>{
                return arr.id === parseInt(e.target.value);
            })

            if(prdFilter2[0].soldout)
            {
                e.target.value = '0';
                return alert('품절인 옵션은 구매하실 수 없습니다.');
            }
            else{
                if(prdFilter2[0].add_price)
                {
                    setTotalPrice(totalPrice+product_price+prdFilter2[0].add_price);
                }
                else setTotalPrice(totalPrice+product_price);
                const listMap = prdFilter2.map((arr)=>{
                    return {data_id:data,count:1,...arr};
                })
                
                console.log(optionListArr);
                setOptionListArr([...optionListArr,listMap])
            }
        }
    }

    
    const onAddPrdValue = (data,e) =>{
        const ReselectionFilter = addPrdListArr.filter((arr)=>{
            return arr[0].data_id === data;
        })
        
        const ReselectionFilter2 = ReselectionFilter.filter((arr)=>{
            return arr[0].id === parseInt(e.target.value);
        })

        if(ReselectionFilter2.length)
        {
            return alert('이미 선택한 옵션입니다.');
        }

        if(e.target.value !== '0')
        {
            const copy = [...addPrd]
            const prdFilter = copy.filter((arr)=>{
                return arr.id === data
            })
         
            const list = prdFilter[0].product_list;
            const prdFilter2 = list.filter((arr)=>{
                return arr.id === parseInt(e.target.value);
            })

            if(prdFilter2[0].soldout)
            {
                e.target.value = '0';
                return alert('품절인 옵션은 구매하실 수 없습니다.');
            }
            else{
                setTotalPrice(totalPrice+prdFilter2[0].price);
                const listMap = prdFilter2.map((arr)=>{
                    return {data_id:data,count:1,...arr};
                })

                setAddPrdListArr([...addPrdListArr,listMap])
            }
        }
    }

    const optionList = optionListArr.map((arr,num)=>{
        return(
            <li>
                {console.log()}
                <span className="list_prd">{arr[0].name}</span>
                <div className="list_count">
                    <button className="delBtn" onClick={()=>onOptionRemove(num)}>X</button>
                    <span className="list_price">{arr[0].add_price ? arr[0].count*(arr[0].add_price + product_price) : arr[0].count*(product_price)}</span>
                    <input className="list_input" value={arr[0].count} onChange={(e)=>onOptionCount(e,num)}/>
                </div>
            </li>
        )
    })

    const onOptionCount = (e,num) =>{
         const countMap = optionListArr.map((arr,arrIndex)=>{
            if(arrIndex === num)
            {
                arr[0].count = parseInt(e.target.value);
            }
            return arr;
         })

         setOptionListArr(countMap);
    }

    const addPrdList = addPrdListArr.map((arr,num)=>{
        return(
            <li>
                {console.log()}
                <span className="list_prd">{arr[0].name}</span>
                <div className="list_count">
                    <button className="delBtn" onClick={()=>onAddPrdRemove(num)}>X</button>
                    <span className="list_price">{arr[0].price}</span>
                    <input className="list_input" value={arr[0].count} onChange={(e)=>onAddPrdCount(e,num)}/>
                </div>
            </li>
        )
    })

    const onAddPrdCount = (e,num) =>{
        const countMap = addPrdListArr.map((arr,arrIndex)=>{
           if(arrIndex === num)
           {
               arr[0].count = parseInt(e.target.value);
           }
           return arr;
        })

        setAddPrdListArr(countMap);
   }

    const onOptionRemove = (num) =>{
        const priceFilter = optionListArr.filter((arr,fil_num)=>{
            return fil_num === num;
        })
        if(priceFilter[0][0].add_price)
        {
            setTotalPrice(totalPrice-product_price-priceFilter[0][0].add_price)
        }
        else setTotalPrice(totalPrice-product_price);

        const removeFilter = optionListArr.filter((arr,fil_num)=>{
            return fil_num !== num;
        })
     
        setOptionListArr(removeFilter);
     }

     const onAddPrdRemove = (num) =>{
        const priceFilter = addPrdListArr.filter((arr,fil_num)=>{
            return fil_num === num;
        })

        setTotalPrice(totalPrice-priceFilter[0][0].price);
        const removeFilter = addPrdListArr.filter((arr,fil_num)=>{
            return fil_num !== num;
        })
        setAddPrdListArr(removeFilter);
     }

    const onDeliverySel=(e)=>{
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
                                                        <select onChange={(e) => onOptionValue(option_item.id, e)}>
                                                            <option value='0'>{option_item.name}</option>
                                                            {
                                                                option_item.option_list.map((list)=>{
                                                                    return <option value={list.id}>{list.name}{list.add_price ? "  ("+list.add_price+"원)추가" : ''} {list.soldout ? "(품절)": ''}</option>
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
                                                            <select onChange={(e) => onAddPrdValue(addItem.id, e)}>
                                                                <option value='0'>{addItem.name}</option>
                                                                {
                                                                    addItem.product_list.map((list)=>{
                                                                     return <option value={list.id}>{list.name} {list.price}원 {list.soldout ? "(품절)": ''}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="purchase_list">
                                        {optionList}
                                        {addPrdList}
                                    </ul>

                                    <div className="total">
                                            <span className="total_count">총 수량 {totalCount}개</span>
                                        <span className="total_cost">
                                            총 상품금액
                                            <span>{totalPrice}원</span>
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