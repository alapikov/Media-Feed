import React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PostsList from './routes/PostsList';
import ProfilePage from './routes/ProfilePage';
import './styles/styles.styl';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PostsList />,
    },
    {
        path: 'user/:userId',
        element: <ProfilePage />,
    },
]);

const rootEl = document.getElementById('root')!;

const root = createRoot(rootEl);
root.render(<RouterProvider router={router} />);
