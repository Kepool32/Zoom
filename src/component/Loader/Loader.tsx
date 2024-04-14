import React from 'react';
import styles from './Loader.module.scss'; // Импорт стилей из модуля SCSS

const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles['loader-inner']}></div>
        </div>
    );
};

export default Loader;
