import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {apiBase} from '../globals';
import loadingIcon from '../imgs/loadingIcon.gif';
import Image from '../imgs/postImg.jpeg';
import '../styles/styles.styl';
import {Comment, PostItemProps} from '../types';

const PostItem: React.FC<PostItemProps> = ({userId, id, title, body, showComments}) => {
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
            <Link to={`user/${userId}`} state={{userId: userId}} className='postAuthor routerLink'>
                {user.name}, {user.email}
            </Link>
            {showComments ? (
                <>
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
                </>
            ) : null}
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
