import React, { useEffect, useState } from 'react';
import '../css/Products.css'
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import ProductsInfo from './ProductsInfo'
import Installment from './Installment';

function Products(){

    const [prdData,setPrdData] = useState({});
    const [categoryList,setCategoryList] = useState([])
    const [deliveryMethod,setDeliveryMethod] = useState([]);
    const [prdImg,setPrdImg] = useState([])
    const [imgState,setImgState] = useState('');
    const [saleInfo,setSaleInfo] = useState([]);
    const [prdOption,setPrdOption] = useState([])
    const [addPrd,setAddPrd] = useState([])
    const [deliverySelValue,setDeliverySelValue] = useState("1")
    const [optionListArr,setOptionListArr] = useState([]);
    const [addPrdListArr,setAddPrdListArr] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [installmentState,setInstallmentState] = useState(false);
    // const [testbasic,settestbasic] = useState([]);

    
    const {product_code,product_name,product_price} = prdData;

    useEffect(()=>{
        Axios.get(process.env.PUBLIC_URL+'/ProductsData.json').then((response)=>{
            console.log(response.data);
            setPrdData(response.data);
            setCategoryList(response.data.category_list);
            setPrdImg(response.data.product_image);
            setImgState(response.data.product_image[0].url);
            setSaleInfo(response.data.sale_info);
            setDeliveryMethod(response.data.delivery_method);
            setPrdOption(response.data.option);
            setAddPrd(response.data.add_product);
            Calculator();
            // settestbasic(response.data.product_information.basic)
        })
    },[addPrdListArr,optionListArr])

    const imgPaging = prdImg.map((arr)=>{
        if(prdImg.length > 1)
        {
            return(
                <>
                {console.log(arr.url)}
                <span className="_image_box" onMouseOver={()=>onPaging(arr.url)}><img src={arr.url} alt="img"/></span>
                </>
            )
        }
    })
        
    const onPaging = (url) =>{
        setImgState(url);
    }
    

    const Calculator = () =>{
        const optionCountReduce = optionListArr.reduce((acc,arr)=>{
            return acc+arr.count;
        },0)

        const optionPriceReduce = optionListArr.reduce((acc,arr)=>{
            if(arr.add_price)
            {
                return acc+(arr.count*(product_price+arr.add_price));
            }
            else return acc+(arr.count*product_price);
        },0)

        const addPrdCountReduce = addPrdListArr.reduce((acc,arr)=>{
            return acc+arr.count;
        },0)

        const addPrdPriceReduce = addPrdListArr.reduce((acc,arr)=>{
            return acc+(arr.count*arr.price);
        },0)

        setTotalCount(optionCountReduce+addPrdCountReduce);
        setTotalPrice(optionPriceReduce+addPrdPriceReduce);
    }

    const onSelectValue = (dataType,arrList,type,data,e) =>{
        const ReselectionFilter = arrList.filter((arr)=>{
            return arr.data_id === data;
        })
        
        const ReselectionFilter2 = ReselectionFilter.filter((arr)=>{
            return arr.id === parseInt(e.target.value);
        })

        if(ReselectionFilter2.length)
        {
            return alert('이미 선택한 옵션입니다.');
        }

        

        if(e.target.value !== '0')
        {
            const copy = [...dataType];
            const prdFilter = copy.filter((arr)=>{
                return  arr.id === data
            })

            let list;

            if(type === 'option')
            {
                list = prdFilter[0].option_list;
            }
            else if(type === 'addPrd')
            {
                list = prdFilter[0].product_list;
            }

            const prdFilter2 = list.filter((arr)=>{
                return arr.id === parseInt(e.target.value);
            })

            const filter_list = prdFilter2[0];
            console.log(filter_list);

            if(filter_list.soldout)
            {
                e.target.value = '0';
                return alert('품절인 옵션은 구매하실 수 없습니다.');
            }
            else{
                const listMap = prdFilter2.map((arr)=>{
                return {data_id:data,count:1,...arr};
                })
                
                const prdOp = listMap[0];
                if(type === 'option')
                {
                    setOptionListArr([...arrList,prdOp])
                }
                else if(type === 'addPrd')
                {
                    setAddPrdListArr([...arrList,prdOp])
                }
                
            }
        }
    }

    const optionList = optionListArr.map((arr,num)=>{
        return(
            <li>
                {console.log()}
                <span className="list_prd">{arr.name}</span>
                <div className="list_count">
                    <button className="delBtn" onClick={()=>onRemove(num,optionListArr,'option')}>X</button>
                    <span className="list_price">{arr.add_price ? arr.count*(arr.add_price + product_price) : arr.count*(product_price)}</span>
                    <div className="list_input" >
                        <button onClick={()=>{onCountBtn(optionListArr,num,'option','minus')}}>-</button>
                        <input value={arr.count} onChange={(e) => onChangeCount(optionListArr,e,num,'option')}/>
                        <button onClick={()=>{onCountBtn(optionListArr,num,'option','plus')}}>+</button>
                    </div>
                </div>
            </li>
        )
    })

    const addPrdList = addPrdListArr.map((arr,num)=>{
        return(
            <li>
                {console.log()}
                <span className="list_prd">{arr.name}</span>
                <div className="list_count">
                    <button className="delBtn" onClick={()=>onRemove(num,addPrdListArr,'addPrd')}>X</button>
                    <span className="list_price">{arr.count*(arr.price)}</span>
                    <div className="list_input" >
                        <button onClick={()=>{onCountBtn(addPrdListArr,num,'addPrd','minus')}}>-</button>
                        <input value={arr.count} onChange={(e) => onChangeCount(addPrdListArr,e,num,'addPrd')}/>
                        <button onClick={()=>{onCountBtn(addPrdListArr,num,'addPrd','plus')}}>+</button>
                    </div>
                </div>
            </li>
        )
    })

    const onBlurCount = (e) =>{
        if(e.target.value === '0' || e.target.value === '')
        {
            e.target.value= '1';
            alert("1개 이상부터 구매하실 수 있습니다.");
        }
    }
    

    const onChangeCount = (arrList,e,num,type) =>{
        const inputNumber = e.target.value === "" ? 0 : parseInt(e.target.value);
        const countMap = [...arrList];
        countMap[num].count = inputNumber;

        if(type === 'option')
        {
            setOptionListArr(countMap);
        }
        else if(type === 'addPrd')
        {
            setAddPrdListArr(countMap);
        }
 
   }

    const arrTypeCheck = (arr,type) =>{
        if(type === 'option')
        {
            setOptionListArr(arr);
        }
        else if(type === 'addPrd')
        {
            setAddPrdListArr(arr);
        }
    } 

    const onCountBtn = (arrList,num,arrType,type) =>{

        const listCopy = [...arrList];

        if(type === 'plus')
        {
            listCopy[num].count +=1;
            arrTypeCheck(listCopy,arrType)
        }
        else if(type === 'minus')
        {
            if(listCopy[num].count - 1 !== 0)
            {
                listCopy[num].count -=1;
            }
            arrTypeCheck(listCopy,arrType)
        }
    }

    const onRemove = (num,listArr,type) =>{
        const removeFilter = listArr.filter((arr,fil_num)=>{
            return fil_num !== num;
        })
        
        if(type === 'option')
        {
            console.log("옵션");
            setOptionListArr(removeFilter);
        }
        else if(type === 'addPrd')
        {
            console.log("추가상품");
            setAddPrdListArr(removeFilter);
        }
     }

    const onDeliverySel=(e)=>{
        setDeliverySelValue(e.target.options[e.target.selectedIndex].value);
    }

    const deliverySel = deliveryMethod.map((arr)=>{
        return <option value={arr.id}>{arr.name}</option>
    })

    const oninstallment = () =>{
        setInstallmentState(true);
    }

    const offinstallment = () =>{
        setInstallmentState(false);
    }
    
    return(
    <div>
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
                                    <img src={imgState}  alt="img"/>
                                </div>
                                <div className="ico_goods"></div>
                            </div>

                            <div className="thumbnail_area thmb_lst more">
                                {imgPaging}
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
                                                <a href="#" className="detailBtn" onClick={oninstallment}>자세히보기</a>
                                            </div>
                                        </dd>
                                    </dl>

                                    {installmentState ?<Installment btn={offinstallment}/> : ''}

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
                                                        <select onChange={(e) => onSelectValue(prdOption,optionListArr,'option',option_item.id,e)}>
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
                                                            <select onChange={(e) => onSelectValue(addPrd,addPrdListArr,'addPrd',addItem.id,e)}>
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
        
        {/* 하단 */}
        {Object.keys(prdData).length > 0 ? <ProductsInfo data={prdData}/> : ''}

    </div>
    )
}

export default Products;