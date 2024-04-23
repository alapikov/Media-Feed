import {createContext} from 'react';
import {Post, SetPostsFE} from './types';

export const apiBase = 'https://jsonplaceholder.typicode.com';

export const PostsContext = createContext<[Post[], Post[], SetPostsFE] | []>([]);

export const debounce = (fn: Function, ms: number) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn, ms);
    };
};

export const lazyLoadPosts  = (posts) => {
    
}
