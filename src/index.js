import ReactDOM from 'react-dom';
import React from 'react';

import styles from './index.block.css';

import A from './components/A';

const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);

ReactDOM.render(
    (
        <div className={styles}>
            <A/>
        </div>
    ),
    root
);
