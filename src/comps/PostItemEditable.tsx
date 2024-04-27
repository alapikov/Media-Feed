import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useEffect, useState} from 'react';
import {apiBase} from '../globals';
import PostItem from './PostItem';
const axios = require('axios').default;

const PostItemEditable = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [titleValue, setTitleValue] = useState(props.title);
    const [bodyValue, setBodyValue] = useState(props.body);
    const editTools = {
        editMode: editMode,
        setTitleValue: setTitleValue,
        setBodyValue: setBodyValue,
    };

    const toggleEditMode = () => {
        setEditMode((editMode) => !editMode);
    };

    const deletePost = () => {
        axios.delete(`${apiBase}/posts/${props.id}`).then((res) => {
            console.log(`Удаление поста с заголовком: ${titleValue.slice(0, 15)}... -----> `);
            console.log(res);
        });
    };

    useEffect(() => {
        if (!editMode) {
            if (titleValue !== props.title || bodyValue !== props.body) {
                if (props.id) {
                    axios
                        .put(`${apiBase}/posts/${props.id}`, {
                            title: titleValue,
                            body: bodyValue,
                        })
                        .then((res) => {
                            //prettier-ignore
                            console.log(`Обновление поста с заголовком: ${titleValue.slice(0, 15)}... -----> `);
                            console.log(res);
                        });
                } else {
                    axios
                        .post(`${apiBase}/posts`, {
                            userId: props.userId,
                            title: titleValue,
                            body: bodyValue,
                        })
                        .then((res) => {
                            //prettier-ignore
                            console.log(`Создание поста с заголовком: ${titleValue.slice(0, 15)}... -----> `);
                            console.log(res);
                        });
                }
            }
        }
    }, [editMode]);

    return (
        <div className='postItemEditable'>
            <div className='editBtns'>
                <BorderColorIcon onClick={() => toggleEditMode()} />
                <DeleteIcon onClick={() => deletePost()} />
            </div>
            <PostItem {...props} editTools={editTools} />
        </div>
    );
};

export default PostItemEditable;
