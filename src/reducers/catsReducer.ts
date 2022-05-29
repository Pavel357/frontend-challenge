import { ICatsState, CatsAction, CatsActionType } from "../types/catsType"

const initialState: ICatsState = {
    catsList: [],
    catsStatusLoading: 'idle',
}

const catsReducer = (state = initialState, action: CatsAction): ICatsState => {
    switch (action.type) {
        case CatsActionType.CATS_FETCHING:
                return {
                    ...state,
                    catsStatusLoading: 'loading'
                }
        case CatsActionType.CATS_FETCHED:
            return {
                ...state,
                catsList: action.payload,
                catsStatusLoading: 'idle'
            }
        case CatsActionType.CATS_FETCHED_FAVORITES:
            return {
                ...state,
                catsList: action.payload,
                catsStatusLoading: 'idle'
            }
        case CatsActionType.CATS_FETCHING_ERROR:
            return {
                ...state,
                catsStatusLoading: 'error'
            }
        case CatsActionType.CATS_CLEAR:
            return {
                ...state,
                catsList: [],
                catsStatusLoading: 'loading'
            }
        case CatsActionType.CAT_DELETE_FAVORITES:
            return {
                ...state,
                catsList: state.catsList.filter(item => item.id !== action.payload),
                catsStatusLoading: 'idle'
            }
        default:
            return state
    }
}

export default catsReducer;