import '../../styles/index.scss';
import './catsList.scss';

import { FC, ReactElement, Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CatsListItem from '../catsListItem/CatsListItem';
import { useTypedSelector } from '../../hooks/useTypedSelector'; 
import { CatsAction, ICatId } from '../../types/catsType';
import { useHttp } from '../../hooks/http.hook';
import { catsFetching, catsFetched, catsFetchedFavorites, catsFetchingError, catsClear, catDeleteFavorites, fetchingTrue, fetchingFalse } from '../../actions/catsActions';
import { ICatsList } from '../../types/catsType';
import SpinnerStart from '../spinner/SpinnerStart';
import ErrorMessage from '../errorMessage/ErrorMessage';
import HeaderMenu from '../headerMenu/HeaderMenu';
import SpinnerMore from '../spinner/SpinnerMore';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const CatsList: FC = (): ReactElement => {
    const { catsList, catsStatusLoading, currentPage, fetching } = useTypedSelector(state => state.cats);
    const catsDispatch: Dispatch<CatsAction> = useDispatch();

    let [imageId, setImageId] = useState<string | number>('');
    let [favorite, setFavorite] = useState<boolean>(false);

    const totalCount = 10000;
    const [loading, setLoading] = useState<ReactElement>(<span></span>);

    const { request } = useHttp();

    useEffect(() => {
        if (fetching) {
            if (!catsList.length) {
                catsDispatch(catsClear());
            }

            request<ICatsList[]>(`https://api.thecatapi.com/v1/images/search?limit=30&page=${currentPage}&order=Desc`)
                .then(data => catsDispatch(catsFetched(data)))
                .catch(() => catsDispatch(catsFetchingError()))
                .finally(() => catsDispatch(fetchingFalse()))

            // eslint-disable-next-line
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [totalCount])

    const scrollHandler = (): void => {
        if (document.body.offsetHeight - (window.scrollY + window.innerHeight) < 100 
        && catsList.length < totalCount) {
            const menuFavorites = document.querySelector(`.header-list__item_favorites`);

            if (!menuFavorites?.classList[2]) {
                catsDispatch(fetchingTrue())
            }

            setLoading(<SpinnerMore />)
        }
    }

    let spinnerStart: ReactElement = <></>;
    let errorMessage: ReactElement = <></>;

    if (catsStatusLoading === 'loading') {
        spinnerStart = <SpinnerStart />
    } else if (catsStatusLoading === 'error') {
        errorMessage = <ErrorMessage />
    }

    const heartImageContainerFunc = (id: string | number): void => {
        const catsPhoto = document.querySelector(`.cats-list__item[data-number='${id}']`);

        setImageId(id);

        if (typeof id === 'number') {
            catsPhoto?.children[2].classList.toggle('hidden');
        } else {
            catsPhoto?.children[1].classList.toggle('hidden');
        }
    }

    const heartFunc = (id: string | number): void => {
        const catsPhoto = document.querySelector(`.cats-list__item[data-number='${id}']`);

        if (typeof id === 'string') {
            catsPhoto?.children[1].classList.toggle('hidden');
            catsPhoto?.children[2].classList.toggle('hidden');
        }
    }

    const catToggleFavouritesFunc = (id: string | number): void => {
        const dataCat: ICatId  = {
            image_id: imageId
        }

        if (favorite) {
            request<ICatId>(`https://api.thecatapi.com/v1/favourites/${id}`)
                .then(data => {
                    request<ICatId>(`https://api.thecatapi.com/v1/favourites/${id}`, 'DELETE')
                        .then(data => {
                            catsDispatch(catDeleteFavorites(id));
                        })
                        .catch(() => catsDispatch(catsFetchingError()))
                })
                .catch(() => catsDispatch(catsFetchingError()))
        } else {
            request<ICatId>('https://api.thecatapi.com/v1/favourites', 'POST', JSON.stringify(dataCat))
                    .then(data => console.log(data))
                    .catch(() => catsDispatch(catsFetchingError()))
        }

    }

    const catsListFunc = (arr: ICatsList[]): ReactElement => {
        if (catsList.length === 0 && catsStatusLoading === 'idle') {
            return <li className='nothing'>Котиков пока нет, но скоро они появятся...</li>
        }

        return (
            <>
                {
                    arr.map(item => {
                        return (
                            <CatsListItem
                                key={item.id}
                                url={item.image ? item.image.url : item.url}
                                id={item.id}
                                heartImageContainerFuncVisible={() => heartImageContainerFunc(item.id)}
                                heartImageContainerFuncHidden={() => heartImageContainerFunc(item.id)}
                                heartFunc={() => heartFunc(item.id)}
                                catToggleFavouritesFunc={() => catToggleFavouritesFunc(item.id)} />
                        )
                    })
                }
            </>
        )
    }

    const catsListResult = catsListFunc(catsList);

    const allCatsMenu = document.querySelector('.header-list__item_all');
    const favoritesCatsMenu = document.querySelector('.header-list__item_favorites');

    const favoritesCats = (): void => {
        setFavorite(false);

        allCatsMenu?.classList.remove('header-list__item_active');
        favoritesCatsMenu?.classList.add('header-list__item_active');

        catsDispatch(catsClear());

        request<ICatsList[]>(`https://api.thecatapi.com/v1/favourites`)
            .then(data => {
                catsDispatch(catsFetchedFavorites(data))
            })
            .catch(() => catsDispatch(catsFetchingError()))
    }

    const allCats = (): void => {
        setFavorite(false);

        favoritesCatsMenu?.classList.remove('header-list__item_active');
        allCatsMenu?.classList.add('header-list__item_active');

        catsDispatch(catsClear());

        request<ICatsList[]>(`https://api.thecatapi.com/v1/images/search?limit=30&page=${currentPage}&order=Desc`)
            .then(data => catsDispatch(catsFetched(data)))
            .catch(() => catsDispatch(catsFetchingError()))
    }

    const catsPhoto: ReactElement = (
        <section className='cats-photo'>
            <div className="container">
                <ul className="cats-list">
                    {catsListResult}
                </ul>
            </div>
        </section>
    )

    return (
        <>
            <ErrorBoundary>
                <HeaderMenu favoritesCats={favoritesCats} allCats={allCats} />
            </ErrorBoundary>
            
            { spinnerStart }
            { catsStatusLoading !== 'error' ? catsPhoto :  errorMessage}
            {fetching ? loading : ''}
        </>
    );
};

export default CatsList;
