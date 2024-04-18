import React, {useState, useEffect, useRef, lazy, Suspense} from 'react';
import {PostItemIsLoading} from './PostItem';
import {apiBase} from '../data';
import {Post} from '../types';
const axios = require('axios').default;
import '../styles/styles.styl';

export const FeedPage: React.FC = () => {
    const idx = useRef(2);
    const [posts, setPosts] = useState<Post[]>([]);
    const [postsToRender, setPostsToRender] = useState<Post[]>([]);
    const observerTarget = useRef(null);

    useEffect(() => {
        // prettier-ignore
        axios.get(`${apiBase}/posts`)
        .then((res: {data: Post[]}) => {
            setPosts(res.data);
            setPostsToRender(res.data.slice(0, 2))
        });
    }, []);

    

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            function showMorePosts() {
                const addedPosts = posts.slice(idx.current, idx.current + 2);
                idx.current = idx.current + 2;
                setPostsToRender([...postsToRender, ...addedPosts]);
            }
            showMorePosts();
          }
        });
        observer.observe(observerTarget.current!);
      }, []);
    

    return (
        <>
            {postsToRender.map((post) => (
                <Suspense key={post.id} fallback={<PostItemIsLoading />}>
                    {/* <div onClick={showMorePosts}> */}
                    <PostItemLazy {...post} />
                    {/* </div> */}
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
