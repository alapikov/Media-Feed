import React from 'react';
import {Header} from './comps/Header';
import {FeedPage} from './comps/FeedPage';
import './styles/styles.styl';

export const App: React.FC = () => {
    setTimeout(() => {
        const root = document.getElementById('root');
        root?.classList.add('appeared');
    }, 800);

    return (
        <>
            <Header />
            <div id='body'>
                <FeedPage />
            </div>
        </>
    );
};
