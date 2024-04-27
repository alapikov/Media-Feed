import React, {useEffect, useState} from 'react';
import {FeedPage} from '../comps/FeedPage';
import HeaderPosts from '../comps/HeaderPosts';
import {PostsContext, apiBase} from '../globals';
import '../styles/styles.styl';
import {Post} from '../types';
const axios = require('axios').default;

const PostsList: React.FC = () => {
    setTimeout(() => {
        const root = document.getElementById('root');
        root?.classList.add('appeared');
    }, 800);

    const [postsAll, setPostsAll] = useState<Post[]>([]);
    const [postsList, setPostsList] = useState<Post[]>([]);
    const setPostsListFn = (newValue: Post[]) => setPostsList(newValue);

    useEffect(() => {
        // prettier-ignore
        axios.get(`${apiBase}/posts`)
        .then((res: {data: Post[]}) => {
            setPostsAll(res.data);
            setPostsList(res.data);
            sessionStorage.setItem('postsCount', res.data.length.toString())
        });
    }, []);

    return (
        <>
            <PostsContext.Provider value={[postsAll, postsList, setPostsListFn]}>
                <HeaderPosts />
                <div id='body'>
                    <FeedPage />
                </div>
            </PostsContext.Provider>
        </>
    );
};

export default PostsList;
