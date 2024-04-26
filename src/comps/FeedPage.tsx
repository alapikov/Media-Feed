import React, {Suspense, lazy, useContext, useEffect, useRef, useState, useMemo} from 'react';
import {PostsContext} from '../globals';
import '../styles/styles.styl';
import {Post} from '../types';
import {PostItemIsLoading} from './PostItem';
import { PostItemLazyFakeWrap } from './PostItem';

export const FeedPage: React.FC = () => {
    const idx = useRef(0);
    const [postsAll, postsList, setPostsListFn] = useContext(PostsContext);
    const [postsToRender, setPostsToRender] = useState<Post[]>([]);
    const observerTarget = useRef(null);    

    useEffect(() => {
        idx.current = 0;
        setPostsToRender(postsList.slice(0, 2));
    }, [postsList]);

    const showMorePosts = () => {
        idx.current = idx.current + 2;
        let addedPosts;
        if (idx.current + 2 <= postsList.length - 1) {
            addedPosts = postsList.slice(idx.current, idx.current + 2);
        } else {
            addedPosts = postsList.slice(idx.current);
        }
        setPostsToRender((postsToRender) => [...postsToRender, ...addedPosts]);
    };

    useEffect(() => {
        const runObserver = setTimeout(() => {
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
        }, 1800);

        return () => clearTimeout(runObserver);
    }, [observerTarget, postsList]);

    return (
        <>
            {postsToRender.map((post) => (
                <Suspense key={post.id} fallback={<PostItemIsLoading />}>
                    <PostItemLazyFakeWrap {...post} showComments={true} />
                </Suspense>
            ))}
            <div id='observerTarget' ref={observerTarget}></div>
        </>
    );
};
