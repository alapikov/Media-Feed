import { TextField } from '@mui/material';
import React from 'react';
import { ProfilePageProps } from '../types';

export const ProfilePage: React.FC<ProfilePageProps> = () => {
    return (
        <div id='profileCont'>
            <TextField variant="outlined" label="Outlined" />
            <TextField variant="outlined" label="Outlined" />
            <TextField variant="outlined" label="Outlined" />
        </div>
    )
}