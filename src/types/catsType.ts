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
}

export enum CatsActionType {
    CATS_FETCHING = 'CATS_FETCHING',
    CATS_FETCHED = 'CATS_FETCHED',
    CATS_FETCHED_FAVORITES = 'CATS_FETCHED_FAVORITES',
    CATS_FETCHING_ERROR = 'CATS_FETCHING_ERROR',
    CATS_CLEAR = 'CATS_CLEAR',
    CAT_DELETE_FAVORITES = 'CAT_DELETE_FAVORITES',
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

export type CatsAction = ICatsFetching | ICatsFetched | ICatsFetchedFavorites | ICatsFetchingError | ICatsClear | ICatDeleteFavorites;