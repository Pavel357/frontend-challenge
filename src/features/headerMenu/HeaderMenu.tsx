import '../../styles/index.scss';
import './headerMenu.scss';

import { FC, ReactElement } from 'react';

interface IFaveoritesCats {
    favoritesCats: () => void;
    allCats: () => void;
}

const HeaderMenu: FC<IFaveoritesCats> = ({favoritesCats, allCats}): ReactElement=> {
    return (
        <header className='header-menu'>
            <div className="container">
                <ul className="header-list">
                    <li className={`header-list__item header-list__item_all header-list__item_active`} onClick={allCats}>
                        <a href="#">Все котики</a>
                        </li>
                    <li className="header-list__item header-list__item_favorites" onClick={favoritesCats}>
                        <a href="#">Любимые котики</a>
                        </li>
                </ul>
            </div>
        </header>
    );
};

export default HeaderMenu;