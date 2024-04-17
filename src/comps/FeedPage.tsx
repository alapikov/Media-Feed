import React, {useState, useEffect, lazy, Suspense} from 'react';
const PostItemLazy = lazy(() => import('./PostItem'));
import {apiBase} from '../data';
import {Post} from '../types';
const axios = require('axios').default;
import '../styles/styles.styl';

export const FeedPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get(`${apiBase}/posts`).then((res: {data: Post[]}) => {
            setPosts(res.data);
        });
    }, []);

    return (
        <>
            {posts.map((post) => (
                <Suspense fallback={<PostIsLoading />}>
                    <PostItemLazy {...post} />;
                </Suspense>
            ))}
        </>
    );
};

const PostIsLoading = () => <div>Пост грузится!</div>;
