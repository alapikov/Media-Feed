import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import {Link} from 'react-router-dom';

const HeaderProfile: React.FC = () => {
    return (
        <header id='header'>
            <Link to='/' className='routerLink'>
                <ArrowBackIcon fontSize='large' classes={{root: 'backIcon'}} />
            </Link>
        </header>
    );
};

export default HeaderProfile;
