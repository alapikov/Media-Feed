import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useEffect, useRef, useState} from 'react';
import {apiBase} from '../globals';
import PostItem from './PostItem';
const axios = require('axios').default;

const PostItemEditable = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const titleValue = useRef<string>(props.title);
    const bodyValue = useRef<string>(props.body);
    const editTools = {
        editMode: editMode,
        titleValue: titleValue,
        bodyValue: bodyValue,
    };

    const toggleEditMode = () => {
        setEditMode((editMode) => !editMode);
    };

    useEffect(() => {
        // axios.put(url[, data[, config]])
        if (titleValue.current !== props.title || bodyValue.current !== props.body) {
            //prettier-ignore
            axios.put(`${apiBase}/posts/${props.id}`, {
                    title: titleValue.current,
                    body: bodyValue.current,
                })
                .then((res) => {
                    //prettier-ignore
                    console.log(`Обновление поста с заголовком: ${titleValue.current.slice(0, 15)} - ` + res);
                });
        }
    }, [titleValue, bodyValue]);

    return (
        <div className='postItemEditable'>
            <div className='editBtns'>
                <BorderColorIcon onClick={() => toggleEditMode()} />
                <DeleteIcon />
            </div>
            <PostItem {...props} editTools={editTools} />
        </div>
    );
};

export default PostItemEditable;
