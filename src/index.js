import ReactDOM from 'react-dom';
import React from 'react';

import styles from './style.block.css';
import objstr from 'obj-str';

const className = objstr({
    [styles]: true
});

const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);

ReactDOM.render(
    <div className={style}/>,
    root
);
