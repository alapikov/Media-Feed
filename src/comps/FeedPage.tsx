import React, {Suspense, lazy, useContext, useEffect, useRef, useState} from 'react';
import {PostsContext} from '../globals';
import '../styles/styles.styl';
import {Post, FeedPageProps} from '../types';
import {PostItemIsLoading} from './PostItem';

export const FeedPage: React.FC<FeedPageProps> = ({changePageTo}) => {
    const idx = useRef(0);
    const [postsAll, postsList, setPostsListFn] = useContext(PostsContext);
    const [postsToRender, setPostsToRender] = useState<Post[]>([]);
    const observerTarget = useRef(null);
    console.log(postsList);
    

    useEffect(() => {
        if (idx.current + 2 <= postsList?.length - 1) {
            setPostsToRender(postsList.slice(0, idx.current + 2));
        } else {
            setPostsToRender(postsList.slice(0, postsList.length - 1));
        }
    }, [postsList]);

    const showMorePosts = () => {
        idx.current = idx.current + 2;
        let addedPosts;
        if (idx.current + 2 <= postsList?.length - 1) {
            addedPosts = postsList.slice(idx.current, idx.current + 2);
        } else {
            addedPosts = postsList.slice(idx.current, postsList.length - 1);
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
                    <PostItemLazy {...post} changePageTo={changePageTo} />
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
