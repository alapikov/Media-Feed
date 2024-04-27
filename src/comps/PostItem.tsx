import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {apiBase} from '../globals';
import loadingIcon from '../imgs/loadingIcon.gif';
import '../styles/styles.styl';
import {Comment, PostItemProps, Picture} from '../types';

const PostItem: React.FC<PostItemProps> = ({userId, id, title, body, showComments, editTools = null}) => {
    const [user, setUser] = useState<{name?: string; email?: string}>({});
    const [comments, setComments] = useState<Comment[]>([]);
    const [picture, setPicture] = useState<Picture>(null);
    const [commentsVisible, setCommentsVisibility] = useState<Boolean>(false);

    const [titleValue, setTitleValue] = useState<string>(title);
    const [bodyValue, setBodyValue] = useState<string>(body);

    useEffect(() => {
        axios
            .all([
                axios.get(`${apiBase}/users/${userId}`),
                axios.get(`${apiBase}/posts/${id}/comments`),
                axios.get(`${apiBase}/photos/${id}`),
            ])
            .then(
                axios.spread((userRes, commentsRes, pictureRes) => {
                    setUser({name: userRes.data.name, email: userRes.data.email});
                    setComments(commentsRes.data);
                    setPicture(pictureRes.data)
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
                <img src={picture?.url}></img>
            </div>
            <h4 className='postTitle' contentEditable={editTools ? editTools.editMode : false} onInput={(e) => setTitleValue(e.currentTarget.textContent)} onBlur={(e) => editTools.titleValue.current = e.target.innerHTML}>{titleValue}</h4>
            <p className='postText' contentEditable={editTools ? editTools.editMode : false} onBlur={(e) => editTools.bodyValue.current = e.target.innerHTML} onInput={(e) => setBodyValue(e.currentTarget.textContent)}>{bodyValue}</p>
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

export const PostItemLazyFakeWrap = (props) => {
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }, [])

    if (isLoading) {
        return <PostItemIsLoading />
    } else {
        return <PostItem {...props} />
    }
};

export default PostItem;
