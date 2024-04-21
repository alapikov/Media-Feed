import React, {Suspense, lazy, useContext, useEffect, useRef, useState} from 'react';
import {PostsContext} from '../globals';
import '../styles/styles.styl';
import {Post} from '../types';
import {PostItemIsLoading} from './PostItem';

export const FeedPage: React.FC = () => {
    const idx = useRef(0);
    const [posts] = useContext(PostsContext);
    const [postsToRender, setPostsToRender] = useState<Post[]>([]);
    const observerTarget = useRef(null);

    useEffect(() => {
        setPostsToRender(posts.slice(0, idx.current + 2));
    }, [posts]);

    const showMorePosts = () => {
        idx.current = idx.current + 2;
        const addedPosts = posts!.slice(idx.current, idx.current + 2);
        setPostsToRender((postsToRender) => [...postsToRender, ...addedPosts]);
    };

    useEffect(() => {
        const runObserver = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        console.log('is intersecting');

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
        }, 1800);

        return () => clearTimeout(runObserver);
    }, [observerTarget, posts]);

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
