export interface ICatsList {
    id: string;
    url: string;
    image?: {
        id: string | number;
        url: string;
    }
}

export interface ICatsListFavorites {
    image: ICatsList;
}

export interface ICatId {
    image_id: string | number;
}

export interface ICatsState {
    catsList: ICatsList[];
    catsStatusLoading: string;
    currentPage: number;
    fetching: boolean;
}

export enum CatsActionType {
    CATS_FETCHING = 'CATS_FETCHING',
    CATS_FETCHED = 'CATS_FETCHED',
    CATS_FETCHED_FAVORITES = 'CATS_FETCHED_FAVORITES',
    CATS_FETCHING_ERROR = 'CATS_FETCHING_ERROR',
    CATS_CLEAR = 'CATS_CLEAR',
    CAT_DELETE_FAVORITES = 'CAT_DELETE_FAVORITES',
    FETCHING_TRUE = 'FETCHING_TRUE',
    FETCHING_FALSE = 'FETCHING_FALSE'
}

export interface ICatsFetching {
    type: CatsActionType.CATS_FETCHING;
}

export interface ICatsFetched {
    type: CatsActionType.CATS_FETCHED;
    payload: ICatsList[];
}

export interface ICatsFetchedFavorites {
    type: CatsActionType.CATS_FETCHED_FAVORITES;
    payload: ICatsList[];
}

export interface ICatsFetchingError {
    type: CatsActionType.CATS_FETCHING_ERROR;
}

export interface ICatsClear {
    type: CatsActionType.CATS_CLEAR;
}

export interface ICatDeleteFavorites {
    type: CatsActionType.CAT_DELETE_FAVORITES;
    payload: string | number;
}

export interface IFetchingTrue {
    type: CatsActionType.FETCHING_TRUE;
}

export interface IFetchingFalse {
    type: CatsActionType.FETCHING_FALSE;
}

export type CatsAction = ICatsFetching | ICatsFetched | ICatsFetchedFavorites | ICatsFetchingError | ICatsClear | ICatDeleteFavorites | IFetchingTrue | IFetchingFalse;