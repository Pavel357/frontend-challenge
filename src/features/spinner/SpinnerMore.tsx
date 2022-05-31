import './spinner.scss';

import { FC, ReactElement } from 'react';

const SpinnerMore: FC = (): ReactElement => {
    return (
        <div className='loading-cats'>...загружаем еще котиков...</div>
    );
};

export default SpinnerMore;