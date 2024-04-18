import React, {useState, useEffect, useRef, lazy, Suspense} from 'react';
import {PostItemIsLoading} from './PostItem';
import {apiBase} from '../data';
import {Post} from '../types';
const axios = require('axios').default;
import '../styles/styles.styl';

export const FeedPage: React.FC = () => {
    const idx = useRef(2);
    const posts = useRef<Post[]>([]);
    const [postsToRender, setPostsToRender] = useState<Post[]>([]);
    const observerTarget = useRef(null);

    useEffect(() => {
        // prettier-ignore
        axios.get(`${apiBase}/posts`)
        .then((res: {data: Post[]}) => {
            posts.current = res.data;
            setPostsToRender(res.data.slice(0, 2))            
        });
    }, []);

    const showMorePosts = () => {
        const addedPosts = posts.current.slice(idx.current, idx.current + 2);
        idx.current = idx.current + 2;
        setPostsToRender((postsToRender) => [...postsToRender, ...addedPosts]);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    showMorePosts();
                }
            },
            {threshold: 1},
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget]);

    return (
        <>
            {postsToRender.map((post) => (
                <Suspense key={post.id} fallback={<PostItemIsLoading />}>
                    <PostItemLazy {...post} />
                </Suspense>
            ))}
            <div id='observerTarget' ref={observerTarget}></div>
        </>
    );
};

const PostItemLazy = lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1800));
    return import('./PostItem');
});
