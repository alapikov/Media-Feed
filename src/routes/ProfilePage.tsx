import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import HeaderProfile from '../comps/HeaderProfile';
import Profile from '../comps/Profile';
import {apiBase} from '../globals';
import {User} from '../types';
const axios = require('axios').default;

const ProfilePage: React.FC = () => {
    setTimeout(() => {
        const root = document.getElementById('root');
        root?.classList.add('appeared');
    }, 800);

    const {state} = useLocation();
    const [userData, setUserData] = useState<User | {}>({});
    console.log(userData);

    useEffect(() => {
        // prettier-ignore
        axios.get(`${apiBase}/users/${state.userId}`)
        .then((res: {data: User}) => {
            setUserData(res.data)
        });
    }, []);

    return (
        <>
            <HeaderProfile />
            <div id='body'>
                <Profile {...userData} />
            </div>
        </>
    );
};

export default ProfilePage;
