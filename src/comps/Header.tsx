import React from 'react';
import '../styles/styles.styl';
import logoMain from '../imgs/logoMain.png';
import TextField from '@mui/material/TextField';
import { colors } from '@mui/material';

export const Header = () => {
    return (
        <header id='header'>
            <a href='https://niisva.dev'>
                <img src={logoMain} id='logoMain' alt=''></img>
            </a>

            <TextField
                label='Найти публикацию'
                variant='standard'
                id='searchField'
                sx={{
                    '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                        color: '#144d98',
                    },
                    '& .css-1eed5fa-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '2px solid #144d98',
                    },
                    '& .css-1eed5fa-MuiInputBase-root-MuiInput-root::after': {
                        borderBottom: '2px solid #144d98',
                    }
                }}
                InputProps={{
                    type: 'search',
                }}
            />
        </header>
    );
};
