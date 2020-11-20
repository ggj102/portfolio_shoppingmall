const CART_COUNT = 'CART_COUNT';
const CART_COUNT_INCREASE = 'CART_COUNT_INCREASE';
const MEMBER_ID = 'MEMBER_ID';
const MEMBER_NAME = 'MEMBER_NAME';
const DATA_RESET = 'DATA_RESET';

export const gCartCount = count =>({type:CART_COUNT,count});
export const gCartCountIncrease = count =>({type:CART_COUNT_INCREASE,count});
export const gMemberId = id =>({type:MEMBER_ID,id});
export const gMemberName = name =>({type:MEMBER_NAME,name});
export const gDataReset = () =>({type:DATA_RESET});

const initialState = {
    gCount: 0,
    gId: '',
    gName: ''
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
                gName: ''
            }
        default:
            return state;
    }
}