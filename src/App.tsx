import React, {useEffect, useState} from 'react';
import {FeedPage} from './comps/FeedPage';
import {Header} from './comps/Header';
import {PostsContext, apiBase} from './globals';
import './styles/styles.styl';
import {Post} from './types';
const axios = require('axios').default;

export const App: React.FC = () => {
    setTimeout(() => {
        const root = document.getElementById('root');
        root?.classList.add('appeared');
    }, 800);

    const [posts, setPosts] = useState<Post[]>([]);
    const setPostsFn = (newValue: Post[]) => setPosts(newValue);

    useEffect(() => {
        // prettier-ignore
        axios.get(`${apiBase}/posts`)
        .then((res: {data: Post[]}) => {
            setPosts(res.data)
        });
    }, []);

    return (
        <>
            <PostsContext.Provider value={[posts, setPostsFn]}>
                <Header />
                <div id='body'>
                    <FeedPage />
                </div>
            </PostsContext.Provider>
        </>
    );
};
