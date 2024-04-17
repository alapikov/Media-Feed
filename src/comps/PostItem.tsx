import React from 'react';
import '../styles/styles.styl';
import Image from '../imgs/postImg.jpeg';
import { Post } from '../types';
import { apiBase } from '../data';
import axios from 'axios';

const PostItem = ({userId, id, title, body}: Post) => {
    // axios.get(`${apiBase}/users/${userId}`)
    // .then((res: {data: Post[]}) => {
    //     console.log(res);
    // })

    return (
        <div className='postItem'>
            <div className='postImgCont'>
                <img src={Image}></img>
            </div>
            <h4 className='postTitle'>{title}</h4>
            <p className='postText'>{body}</p>
            <p className='postAuthor'>{}</p>
        </div>
    );
};

export default PostItem;