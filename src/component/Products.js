import React, { Fragment, useEffect, useState } from 'react';
import '../css/Products.css'
import { NavLink } from 'react-router-dom';
import ProductsInfo from './ProductsInfo'
import Installment from './Installment';
import MainPageHeader from './mainpage/MainPageHeader';
import { connect } from 'react-redux';
import { gCartCountIncrease, gNowPage } from '../store/modules/GlobalData.js'
import { ProductsCartAddAxios, ProductsDataAxios } from './common/api.js';

function Products(props){

    const {match,history,gCartCountIncrease,loginState, nowPage} = props;
    const [prdData,setPrdData] = useState({});
    const [categoryList,setCategoryList] = useState([])
    const [deliveryMethod,setDeliveryMethod] = useState([]);
    const [prdImg,setPrdImg] = useState([])
    const [imgState,setImgState] = useState('');
    const [saleInfo,setSaleInfo] = useState(null);
    const [prdOption,setPrdOption] = useState([])
    const [addPrd,setAddPrd] = useState([])
    const [deliverySelValue,setDeliverySelValue] = useState(1)
    const [optionListArr,setOptionListArr] = useState([]);
    const [addPrdListArr,setAddPrdListArr] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [installmentState,setInstallmentState] = useState(false);
    const [singleCount,setSingleCount] = useState(1);

    const {product_code,product_name,product_price} = prdData;

    //데이터를 가져옴
    useEffect(()=>{
       ProductsDataAxios(match.params.id).then((response)=>{
            setPrdData(response.data);
            setCategoryList(response.data.category_list);
            console.log(response.data.category_list);
            setPrdImg(response.data.product_image);
            setImgState(response.data.product_image[0].url);
            setDeliveryMethod(response.data.delivery_method);
            setAddPrd(response.data.add_product);
            if(response.data.sale_info)
            {
                setSaleInfo(response.data.sale_info);
            }

            if(response.data.option)
            {
                setPrdOption(response.data.option);
            }
        })
    },[match.params.id])

    // 옵션과 추가상품의 총 수량과 총 가격을 계산해줌
    useEffect(() => {
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

        if(prdOption.length === 0)
        {
            setTotalCount(singleCount+addPrdCountReduce)
            setTotalPrice(singleCount*product_price+addPrdPriceReduce)
        }
        else{
            setTotalCount(optionCountReduce+addPrdCountReduce);
            setTotalPrice(optionPriceReduce+addPrdPriceReduce);
        }

    }, [optionListArr, addPrdListArr, product_price, singleCount, prdOption]);

    // 이미지의 값이 2개 이상일 경우 메인 이미지 하단에 paiging형태로 출력됨
    const imgPaging = prdImg.map((arr,idx) => {
        if(prdImg.length > 1)
        {
            return(
                <span key={idx.toString()} className="_image_box" onMouseOver={()=>onPaging(arr.url)}><img src={arr.url} alt="img"/></span>
            )
        }

        return null;
    })
        
    //paging으로 출력된 이미지를 mouseover 할 경우 url값을 set함
    const onPaging = (url) =>{
        setImgState(url);
    }

    // 옵션과 추가상품의 selectbox의 상품을 선택할 경우 list의 추가 시켜줌
    const onSelectValue = (dataType,arrList,type,id,e) =>{
        const ReselectionFilter = arrList.filter((arr)=>{
            return arr.data_id === id;
        })
        
        const ReselectionFilter2 = ReselectionFilter.find((arr)=>{
            return arr.id === parseInt(e.target.value);
        })
        
        if(ReselectionFilter2)
        {
            if(type === 'option')
            {
                return alert('이미 선택한 옵션입니다.');
            }
            else if(type === 'addPrd')
            {
                return alert('이미 선택한 추가상품입니다.');
            }
        }

        if(e.target.value !== '0')
        {
            const copy = [...dataType];
            const prdFilter = copy.find((arr)=>{
                return  arr.id === id
            })

            let list;

            if(type === 'option')
            {
                list = prdFilter.option_list;
            }
            else if(type === 'addPrd')
            {
                list = prdFilter.product_list;
            }

            const prdFilter2 = list.find((arr)=>{
                return arr.id === parseInt(e.target.value);
            })

            if(prdFilter2.soldout)
            {
                e.target.value = '0';
                return alert('품절인 옵션은 구매하실 수 없습니다.');
            }
            else{
               const prdItem = {...prdFilter2,data_id:id,count:1,};
                
                if(type === 'option')
                {
                    setOptionListArr([...arrList,prdItem])
                }
                else if(type === 'addPrd')
                {
                    setAddPrdListArr([...arrList,prdItem])
                }
                
            }
        }
    }

    // 옵션과 추가상품의 수량을 입력하는 input에서 값이 0 또는 ''일 경우 값을 1로 바꾸고 경고창을 띄움
    const onBlurCount = (arrList,e,num,type) =>{
        if(e.target.value === '0' || e.target.value === '')
        {
            alert("1개 이상부터 구매하실 수 있습니다.");
            const countMap = type !== 'single' && [...arrList];
            
            
            if(type === 'option')
            {
                countMap[num].count = 1;
                setOptionListArr(countMap);
            }
            else if(type === 'addPrd')
            {
                countMap[num].count = 1;
                setAddPrdListArr(countMap);
            }
            else if(type === 'single')
            {
                setSingleCount(1);
            }
        }
    }

    // optionListArr의 값을 map으로 뿌려주며 추가된 상품의 ui가 생성됨 
    const optionList = optionListArr.map((arr,num,idx)=>{
        return(
            <li key={idx}>
                <span className="list_prd">{arr.name}</span>
                <div className="list_count">
                    {<button className="delBtn" onClick={()=>onRemove(num,optionListArr,'option')}>X</button>}
                    <span className="list_price">{arr.add_price ? arr.count*(arr.add_price + product_price) : arr.count*(product_price)}</span>
                    <div className="list_input" >
                        <button onClick={()=>{onCountBtn(optionListArr,num,'option','minus')}}>-</button>
                        <input value={arr.count} onChange={(e) => onChangeCount(optionListArr,e,num,'option')} onBlur={(e)=>{onBlurCount(optionListArr,e,num,'option')}}/>
                        <button onClick={()=>{onCountBtn(optionListArr,num,'option','plus')}}>+</button>
                    </div>
                </div>
            </li>
        )
    })

    // addPrdListArr의 값을 map으로 뿌려주며 추가된 상품의 ui가 생성됨
    const addPrdList = addPrdListArr.map((arr,num,idx)=>{
        return(
            <li key={idx}>
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

    // 옵션과 추가상품의 수량을 입력하는 input에서 값을 바꾸면 해당하는 객체의 count값을 바꾸며 list를 set함
    const onChangeCount = (arrList,e,num,type) =>{
        const inputNumber = e.target.value === "" ? 0 : parseInt(e.target.value);
        const countMap = type !== 'single' && [...arrList];
        
        if(type === 'option')
        {
            countMap[num].count = inputNumber;
            setOptionListArr(countMap);
        }
        else if(type === 'addPrd')
        {
            countMap[num].count = inputNumber;
            setAddPrdListArr(countMap);
        }
        else if(type === 'single')
        {
            setSingleCount(inputNumber);
        }
   }

   // arrTypeCheck
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

    // type을 검사하여 수량 버튼을 동작 시킴
    const onCountBtn = (arrList,num,arrType,type) =>{

        const listCopy = arrType !== 'single' && [...arrList];

        if(type === 'plus')
        {
            if(arrType === 'single')
            {
                setSingleCount(singleCount+1);
            }
            else{
                listCopy[num].count +=1;
                arrTypeCheck(listCopy,arrType)
            }
            
        }
        else if(type === 'minus')
        {
            if(arrType === 'single')
            {
                if(singleCount - 1 !== 0)
                {
                    setSingleCount(singleCount-1);
                }
            }
            else{
                if(listCopy[num].count - 1 !== 0)
                {
                    listCopy[num].count -=1;
                }
                arrTypeCheck(listCopy,arrType)
            }
        }
    }

    // 옵션과 추가상품을 삭제하는 기능
    const onRemove = (num,listArr,type) =>{
        const removeFilter = listArr.filter((arr,fil_num)=>{
            return fil_num !== num;
        })
        
        if(type === 'option')
        {
            setOptionListArr(removeFilter);
        }
        else if(type === 'addPrd')
        {
            setAddPrdListArr(removeFilter);
        }
     }

     // 배송방법 select의 value값을 가져옴
    const onDeliverySel=(e)=>{
        const optionValue = e.target.options[e.target.selectedIndex].value;

        setDeliverySelValue(parseInt(optionValue));
    }

    // deliveryMethod의 들어있는 data값으로 selectbox에 들어갈 option을 생성함
    const deliverySel = deliveryMethod.map((arr,idx)=>{
        return <option key={idx} value={arr.id}>{arr.name}</option>
    })

    // 무이자 상품 자세히보기 활성화 
    const oninstallment = () =>{
        setInstallmentState(true);
    }

    // 무이자 상품 자세히보기 비활성화 
    const offinstallment = () =>{
        setInstallmentState(false);
    }

    
    // 장바구니 클릭 시 이벤트 발생
    // 옵션 미선택시 alert
    // 상품데이터를 서버에 post하며 작업 이후 store에 cartCount값을 dispatch 함
    const onAddCart = () =>{

        if(optionListArr.length === 0 && prdOption.length !== 0)
        {
            alert('옵션을 선택하지 않으셨습니다. 옵션을 선택해 주세요.');
        }
        else if(!loginState)
        {
            const loginConfirm = window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?");
            if(loginConfirm)
            {
                history.push('/LogIn');
            }
        }
        else{
            let postOption = [];

            if(prdOption.length === 0){
                postOption = [[null,null,singleCount]]
            }
            else{
                 postOption = optionListArr.map((arr)=>{
                    return [arr.data_id,arr.id,arr.count];
                });
            }

            const postAddPrd = addPrdListArr.map((arr)=>{
                return [arr.data_id,arr.id,arr.count];
            });
    
            ProductsCartAddAxios(match.params.id,postOption,postAddPrd,deliverySelValue).then(()=>{
                gCartCountIncrease(1);
                const cartPageConfirm = window.confirm('장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?');
                if(cartPageConfirm)
                {
                    nowPage('cart');
                    history.push('/Cart');
                }
            })
        }
    }

    const nullEvent = () =>{
        alert("아직 구현되지 않은 기능입니다.");
    }
    
    return(
    <div className="productsPage">
        <MainPageHeader/>
        <div id="container">
            <div className=" _category_area h_area h_area_v2">
                <div className="loc">
                    <NavLink to="/">홈</NavLink>
                        <span className="bar">{'>'}</span>
                    {
                        categoryList.map((list,num,idx)=>{
                                return (
                                    <Fragment key={idx}>
                                    <NavLink to={"/CategoryPrdList/"+list.id}>{list.name}{categoryList.length === num+1 && "(총"+list.num+"개)"}  </NavLink>
                                    {categoryList.length !== num+1 && <span className="bar">{'>'}</span>}
                                    </Fragment>)
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
                                        </dt>
                                        <dd>
                                            <div className="area_cost">
                                                <strong className="info_cost">
                                                    <span className="price">{product_price}<span>원</span></span>
                                                    {saleInfo &&
                                                        <> 
                                                        <span className="dc">{saleInfo.discount_percent}</span>
                                                        <span className="ori">{saleInfo.original_price}<span>원</span></span>
                                                        </>}
                                                </strong>
                                            </div>
                                            <div className="installment">
                                                <div className="h">무이자할부</div>
                                                <a href="#detailBtn" className="detailBtn" onClick={oninstallment}>자세히보기</a>
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
                                        {deliverySelValue === 1 &&                            
                                        <div className="delivery_cost">
                                            <span className="delivery_cost_text">배송비</span>
                                            <div className="cost">
                                                <div className="delivery_price">{ (deliveryMethod.length && deliveryMethod[0].price) === 0 ? '무료' : deliveryMethod.length && deliveryMethod[0].price+'원'}</div>
                                                <div className="interval">{deliveryMethod.length && deliveryMethod[0].additional_description}</div>
                                                {/* <div><a href="#saving" className="saving">배송비 절약상품보기</a></div> */}
                                            </div>
                                        </div>}
                                    </div>
                                    
                                        <div className={(prdOption.length === 0 && addPrd.length === 0) ? '' : "prd_option"}>
                                        {prdOption.length > 0 && 
                                            <div className="option">
                                                <span>옵션</span>
                                                {
                                                    prdOption.map((option_item,idx) => {
                                                        return (
                                                            <select key={idx} onChange={(e) => onSelectValue(prdOption,optionListArr,'option',option_item.id,e)}>
                                                                <option value='0'>{option_item.name}</option>
                                                                {
                                                                    option_item.option_list.map((list,idx)=>{
                                                                        return <option key={idx}  value={list.id}>{list.name}{list.add_price ? "  ("+list.add_price+"원)추가" : ''} {list.soldout ? "(품절)": ''}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        )
                                                    })
                                                }
                                            </div>}
                                        {addPrd.length > 0 &&
                                            <div className="add">
                                            <span>추가상품</span>
                                            <div className="select_area">
                                                {
                                                    addPrd.map((addItem,idx) => {
                                                        return (
                                                            <select key={idx} onChange={(e) => onSelectValue(addPrd,addPrdListArr,'addPrd',addItem.id,e)}>
                                                                <option value='0'>{addItem.name}</option>
                                                                {
                                                                    addItem.product_list.map((list,idx)=>{
                                                                     return <option key={idx} value={list.id}>{list.name} {list.price}원 {list.soldout ? "(품절)": ''}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>}
                                    </div>
                                    <ul className="purchase_list">
                                        {optionList}
                                        {addPrdList}
                                        {prdOption.length === 0 && 
                                        <div className = "prd_single">
                                            <div className="list_input" >
                                                <button onClick={()=>{onCountBtn(null,null,'single','minus')}}>-</button>
                                                <input value={singleCount} onChange={(e) => onChangeCount(null,e,null,'single')} onBlur={(e)=>{onBlurCount(null,e,null,'single')}}/>
                                                <button onClick={()=>{onCountBtn(null,null,'single','plus')}}>+</button>
                                            </div>
                                        </div>}

                                    </ul>
                                    <div className="total">
                                        <span className="total_count">총 수량 {totalCount}개</span>
                                        <span className="total_cost">
                                            총 상품금액
                                            <span>{totalPrice}원</span>
                                        </span>
                                    </div>
                                    <div className="btn_area">
                                        <div className="buy_btn btn_bg" onClick={nullEvent}>
                                            <div>구매하기</div>
                                        </div>
                                        <div className="basket_btn btn_bg" onClick={onAddCart}>
                                            <div>장바구니</div>
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
        {Object.keys(prdData).length > 0 && <ProductsInfo data={prdData}/>}

    </div>
    )
}

const mapStateToProps = state =>({
    loginState : state.GlobalData.glogin
})

const mapDispatchToProps = dispatch =>({
    gCartCountIncrease: count => dispatch(gCartCountIncrease(count)),
    nowPage: page => dispatch(gNowPage(page))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);