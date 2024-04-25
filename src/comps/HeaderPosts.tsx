import SortIcon from '@mui/icons-material/Sort';
import TextField from '@mui/material/TextField';
import React, {useContext} from 'react';
import {PostsContext, debounce} from '../globals';
import logoMain from '../imgs/logoMain.png';
import '../styles/styles.styl';

const HeaderPosts: React.FC = () => {
    const [postsAll, postsList, setPostsListFn] = useContext(PostsContext);

    const searchFor = (str: string) => {
        const filterPosts = () => {
            if (!str) {
                setPostsListFn(postsAll);
            }
            const postsFiltered = postsAll.filter((post) => post.title.includes(str));
            setPostsListFn(postsFiltered);
            return null;
        };

        return debounce(filterPosts(), 4000);
    };

    const toggleIdSort = () => {
        const postsCopy = [...postsList];
        postsCopy.reverse();
        setPostsListFn(postsCopy);
    };

    return (
        <header id='header'>
            <a href='https://niisva.dev'>
                <img src={logoMain} id='logoMain' alt=''></img>
            </a>

            <TextField
                label='Найти публикацию'
                variant='standard'
                id='searchField'
                style={{paddingBottom: '10px'}}
                sx={{
                    '& .css-1eed5fa-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before':
                        {
                            borderBottom: '2px solid #144d98',
                        },
                    '& .css-1eed5fa-MuiInputBase-root-MuiInput-root::after': {
                        borderBottom: '2px solid #144d98',
                    },
                }}
                InputProps={{
                    type: 'search',
                }}
                onChange={(event) => searchFor(event.target.value)}
            />
            <SortIcon classes={{root: 'sortBtn'}} onClick={() => toggleIdSort()} />
        </header>
    );
};

export default HeaderPosts;
