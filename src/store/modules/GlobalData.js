const CART_COUNT = 'CART_COUNT';
const CART_COUNT_INCREASE = 'CART_COUNT_INCREASE';
const MEMBER_ID = 'MEMBER_ID';
const MEMBER_NAME = 'MEMBER_NAME';
const DATA_RESET = 'DATA_RESET';
const LOGIN_STATE = 'LOGIN_STATE';
const NOW_PAGE = 'NOW_PAGE';

export const gCartCount = count =>({type:CART_COUNT,count});
export const gCartCountIncrease = count =>({type:CART_COUNT_INCREASE,count});
export const gMemberId = id =>({type:MEMBER_ID,id});
export const gMemberName = name =>({type:MEMBER_NAME,name});
export const gDataReset = () =>({type:DATA_RESET});
export const gLoginState = state =>({type:LOGIN_STATE, state});
export const gNowPage = page =>({type:NOW_PAGE, page});

const initialState = {
    gCount: 0,
    gId: '',
    gName: '',
    glogin: false,
    gPage: 'main'
}

export default function GlobalData(state = initialState, action){
    switch(action.type)
    {
        case CART_COUNT:
            return{
                ...state,
                gCount: action.count
            }
        case CART_COUNT_INCREASE:
            return{
                ...state,
                gCount: state.gCount + action.count
            }
        case MEMBER_ID:
            return{
                ...state,
                gId: action.id
            }
        case MEMBER_NAME:
            return{
                ...state,
                gName: action.name
            }
        case DATA_RESET:
            return{
                ...state,
                gCount: 0,
                gId: '',
                gName: '',
                glogin: false
            }
        case LOGIN_STATE:
            return{
                ...state,
                glogin: action.state
            }
        case NOW_PAGE:
            return{
                ...state,
                gPage: action.page
            }
        default:
            return state;
    }
}