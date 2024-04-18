import React, {useState} from 'react';
import '../styles/styles.styl';
import Image from '../imgs/postImg.jpeg';
import loadingIcon from '../imgs/loadingIcon.gif';
import {Post, User, Comment} from '../types';
import {apiBase} from '../data';
import axios from 'axios';
import {useEffect} from 'react';

const PostItem = ({userId, id, title, body}: Post) => {
    const [user, setUser] = useState<{name?: string; email?: string}>({});
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsVisible, setCommentsVisibility] = useState<Boolean>(false);

    useEffect(() => {
        axios
            .all([
                axios.get(`${apiBase}/users/${userId}`),
                axios.get(`${apiBase}/posts/${id}/comments`),
            ])
            .then(
                axios.spread((userRes, commentsRes) => {
                    setUser({name: userRes.data.name, email: userRes.data.email});
                    setComments(commentsRes.data);
                }),
            );
    }, []);

    const toggleComments = () => setCommentsVisibility((commentsVisible) => !commentsVisible);

    const commentItem = (email: string, body: string, id: number) => {
        return (
            <div className='commentItem' key={id}>
                <p className='commentAuthor'>{email}</p>
                <p className='commentText'>{body}</p>
            </div>
        );
    };

    return (
        <div className='postItem' id={`post-${id}`}>
            <div className='postImgCont'>
                <img src={Image}></img>
            </div>
            <h4 className='postTitle'>{title}</h4>
            <p className='postText'>{body}</p>
            <p className='postAuthor'>
                {user.name}, {user.email}
            </p>
            <p className='commentsCounter' onClick={() => toggleComments()}>
                Комментарии: {comments.length}
            </p>
            {commentsVisible && (
                <div className='commentsSection' id='sim'>
                    {comments.map(({email, body}, id) => {
                        return commentItem(email, body, id);
                    })}
                </div>
            )}
        </div>
    );
};

export const PostItemIsLoading = () => {
    return (
        <div className='postItemIsLoading'>
            <img src={loadingIcon} alt=''></img>
        </div>
    );
};

export default PostItem;
