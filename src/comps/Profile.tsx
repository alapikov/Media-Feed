import {TextField} from '@mui/material';
import React from 'react';
import profilePhoto from '../imgs/profilePhoto.jpg';
import {User} from '../types';

const Profile: React.FC<Partial<User>> = (userData) => {
    return (
        <div id='profileCont'>
            <div className='profileCol'>
                <div id='profilePhoto'>
                    <img src={profilePhoto}></img>
                </div>
                <TextFieldCustom label='Компания' value={userData.company?.name} />
                <TextFieldCustom label='Вебсайт' value={userData.website} />
                <TextFieldCustom label='Телефон' value={userData.phone} />
            </div>
            <div className='profileCol'>
                <TextFieldCustom label='Имя' value={userData.name} />
                <TextFieldCustom label='Никнейм' value={userData.username} />
                <TextFieldCustom label='Почта' value={userData.email} />
                <TextFieldCustom label='Город' value={userData.address?.city} />
                <TextFieldCustom label='Адрес' value={userData.address?.street} />
                <TextFieldCustom label='Зипкод' value={userData.address?.zipcode} />
            </div>
        </div>
    );
};

const TextFieldCustom = ({value, label}) =>
    //prettier-ignore
    <TextField variant='outlined' fullWidth classes={{root: 'profileField'}}
        placeholder='Имя' InputProps={{readOnly: true}}
        value={value} InputLabelProps={{shrink: true}} label={label}        
    />;

export default Profile;
