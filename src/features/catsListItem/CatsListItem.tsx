import './catsListItem.scss';

import heartOpacity from '../../assets/heart-opacity.png';
import heart from '../../assets/heart.png';

import { FC, ReactElement } from 'react';

interface ICat {
    url: string;
    id: string;
    heartImageContainerFuncVisible: () => void;
    heartImageContainerFuncHidden: () => void;
    heartFunc: () => void;
    catToggleFavouritesFunc: () => void;
}

const CatsListItem: FC<ICat> = (
    {url, id, heartImageContainerFuncVisible, heartImageContainerFuncHidden, heartFunc, catToggleFavouritesFunc}
): ReactElement => {

    return (
        <li
            className="cats-list__item"
            data-number={id}
            onMouseOver={heartImageContainerFuncVisible}
            onMouseOut={heartImageContainerFuncHidden}>
                <img src={url} alt={id} />
                <img
                    src={heartOpacity}
                    alt="heartOpacity"
                    className='heart-opacity hidden' />
                <img
                    src={heart}
                    alt="heart"
                    className="heart hidden"
                    onClick={catToggleFavouritesFunc}
                    onMouseOver={heartFunc}
                    onMouseOut={heartFunc} />
        </li>
    );
};

export default CatsListItem;