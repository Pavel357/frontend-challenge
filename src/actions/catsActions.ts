import { ICatsList, CatsActionType, ICatsFetching, ICatsFetched, ICatsFetchingError, ICatsFetchedFavorites, ICatsClear, ICatDeleteFavorites, IFetchingTrue, IFetchingFalse } from "../types/catsType";

export const catsFetching = (): ICatsFetching => {
    return {
        type: CatsActionType.CATS_FETCHING
    }
}

export const catsFetched = (cats: ICatsList[]): ICatsFetched => {
    return {
        type: CatsActionType.CATS_FETCHED,
        payload: cats
    }
}

export const catsFetchedFavorites = (cats: ICatsList[]): ICatsFetchedFavorites => {
    return {
        type: CatsActionType.CATS_FETCHED_FAVORITES,
        payload: cats
    }
}

export const catsFetchingError = (): ICatsFetchingError => {
    return {
        type: CatsActionType.CATS_FETCHING_ERROR,
    }
}

export const catsClear = (): ICatsClear => {
    return {
        type: CatsActionType.CATS_CLEAR,
    }
}

export const catDeleteFavorites = (id: string | number): ICatDeleteFavorites => {
    return {
        type: CatsActionType.CAT_DELETE_FAVORITES,
        payload: id
    }
}

export const fetchingTrue = (): IFetchingTrue => {
    return {
        type: CatsActionType.FETCHING_TRUE
    }
}

export const fetchingFalse = (): IFetchingFalse => {
    return {
        type: CatsActionType.FETCHING_FALSE
    }
}