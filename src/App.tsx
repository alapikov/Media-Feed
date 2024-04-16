import React from 'react';
import {Header} from './comps/Header';
import {PostItem} from './comps/PostItem';
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
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
            </div>
        </>
    );
};
