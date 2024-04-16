import React from 'react';
import '../styles/styles.styl';
import Image from '../imgs/postImg.jpeg';

export const PostItem = () => {
    return (
        <div className='postItem'>
            <div className='postImgCont'>
                <img src={Image}></img>
            </div>
            <h4 className='postTitle'>Пост про путешествия</h4>
            <p className='postText'>
                ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident
                rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt
                voluptatem rerum illo velit
            </p>
            <p className='postAuthor'>Alexander Lapikov, a.d.lapikov@yandex.ru</p>
        </div>
    );
};
