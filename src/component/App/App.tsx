
import React from 'react';
import styles from './App.module.scss';

import { useStore } from "../store/index";
import Modal from "../Modal/Modal";

const App: React.FC = () => {
    const { setModalIsOpen } = useStore();

    return (
        <div className={styles.App}>
            <button className={styles["open-modal-button"]} onClick={() => setModalIsOpen(true)}>Посмотреть записи</button>
            <Modal />
        </div>
    );
};

export default App;
