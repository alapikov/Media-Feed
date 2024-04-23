import React, {useEffect, useState} from 'react';
import {FeedPage} from './comps/FeedPage';
import {Header} from './comps/Header';
import {ProfilePage} from './comps/ProfilePage';
import {PostsContext, apiBase} from './globals';
import './styles/styles.styl';
import {Post} from './types';
const axios = require('axios').default;

export const App: React.FC = () => {
    setTimeout(() => {
        const root = document.getElementById('root');
        root?.classList.add('appeared');
    }, 800);

    const [postsAll, setPostsAll] = useState<Post[]>([]);
    const [postsList, setPostsList] = useState<Post[]>([]);
    const setPostsListFn = (newValue: Post[]) => setPostsList(newValue);

    const [currPage, setCurrPage] = useState('FeedPage');
    const changePageTo = (page: string) => {
        setCurrPage(page)
    }

    useEffect(() => {
        // prettier-ignore
        axios.get(`${apiBase}/posts`)
        .then((res: {data: Post[]}) => {
            setPostsAll(res.data)
            setPostsList(res.data)
        });
    }, []);

    return (
        <>
            <PostsContext.Provider value={[postsAll, postsList, setPostsListFn]}>
                <Header />
                <div id='body'>
                    {currPage === 'FeedPage' ? <FeedPage changePageTo={changePageTo} /> : null}
                    {currPage === 'ProfilePage' ? <ProfilePage changePageTo={changePageTo} /> : null}
                </div>
            </PostsContext.Provider>
        </>
    );
};
