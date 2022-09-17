import { FC, ReactElement, lazy, Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import SpinnerStart from '../spinner/SpinnerStart';

const CatsList = lazy(() => import('../catsList/CatsList'))

const App: FC = (): ReactElement => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Котики</title>
                <p>xvxcvxcv</p>
            </Helmet>
            <Suspense fallback={<SpinnerStart />}>
                <CatsList />
            </Suspense>
        </HelmetProvider>
    );
};

export default App;