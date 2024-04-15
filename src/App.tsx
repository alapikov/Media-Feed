import React from 'react';
import './styles/styles.styl';

export const App: React.FC = () => {
    setTimeout(() => {
        const root = document.getElementById('root');
        root?.classList.add('appeared');
    }, 600);

    return 
};
