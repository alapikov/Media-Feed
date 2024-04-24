import React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PostsList from './routes/PostsList';
import './styles/styles.styl';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PostsList />,
    },
]);

const rootEl = document.getElementById('root')!;

const root = createRoot(rootEl);
root.render(<RouterProvider router={router} />);
