import './errorMessage.scss';
import error from './error.gif';

import { FC, ReactElement } from 'react';

const ErrorMessage: FC = (): ReactElement => {
    return (
        <img className='error' src={error} alt='Error' />
    );
};

export default ErrorMessage;