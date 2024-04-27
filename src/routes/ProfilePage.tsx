import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, {Suspense, lazy, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import HeaderProfile from '../comps/HeaderProfile';
import {PostItemIsLoading} from '../comps/PostItem';
import Profile from '../comps/Profile';
import {apiBase} from '../globals';
import {Post, User} from '../types';
const axios = require('axios').default;

const ProfilePage: React.FC = () => {
    setTimeout(() => {
        const root = document.getElementById('root');
        root?.classList.add('appeared');
    }, 800);

    const {state} = useLocation();
    const [userData, setUserData] = useState<User | null>(null);
    const [userPosts, setUserPosts] = useState<Post[] | null>(null);

    const createNewPost = () => {
        const userId = state.userId;
        const props = {
            userId: userId,
            title: 'Введите заголовок',
            body: 'Введите текст поста',
        };
        return props;
    };

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
                    <div
                        id='addPostBtn'
                        onClick={() =>
                            setUserPosts((usersPosts) => [createNewPost(), ...usersPosts])
                        }
                    >
                        <AddCircleIcon />
                    </div>
                    {userPosts?.map((post) => (
                        <Suspense key={post.id} fallback={<PostItemIsLoading />}>
                            <PostItemEditableLazy {...post} showComments={false} />
                        </Suspense>
                    ))}
                </div>
            </div>
        </>
    );
};

const PostItemEditableLazy = lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1800));
    return import('../comps/PostItemEditable');
});

export default ProfilePage;
