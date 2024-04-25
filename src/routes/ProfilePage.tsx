import React, {useEffect, useState, lazy, Suspense} from 'react';
import {useLocation} from 'react-router-dom';
import HeaderProfile from '../comps/HeaderProfile';
import Profile from '../comps/Profile';
import {apiBase} from '../globals';
import {User, Post} from '../types';
import {PostItemIsLoading} from '../comps/PostItem';
const axios = require('axios').default;

const ProfilePage: React.FC = () => {
    setTimeout(() => {
        const root = document.getElementById('root');
        root?.classList.add('appeared');
    }, 800);

    const {state} = useLocation();
    const [userData, setUserData] = useState<User | null>(null);
    const [userPosts, setUserPosts] = useState<Post[] | null>(null);

    useEffect(() => {
        // prettier-ignore
        axios.get(`${apiBase}/users/${state.userId}`)
        .then((res: {data: User}) => {
            setUserData(res.data)
        });
    }, []);

    useEffect(() => {
        // prettier-ignore
        axios.get(`${apiBase}/posts?userId=${state.userId}`)
        .then((res: {data: Post[]}) => {
            setUserPosts(res.data)
        });
    }, []);

    return (
        <>
            <HeaderProfile />
            <div id='body'>
                <Profile {...userData} />
                <div id='userPostsCont'>
                    <p id='userPostsTitle'>Список публикаций {userData?.username}</p>
                </div>
                {userPosts?.map((post) => (
                <Suspense key={post.id} fallback={<PostItemIsLoading />}>
                    <PostItemLazy {...post} showComments={false} />
                </Suspense>
            ))}
            </div>
        </>
    );
};

const PostItemLazy = lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1800));
    return import('../comps/PostItem');
});

export default ProfilePage;
