import React, { useState } from 'react';
import styles from './App.module.scss';
import Modal from "../Modal/Modal";

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.App}>
            <button className={styles["open-modal-button"]} onClick={openModal}>Открыть Zoom встречи</button>
            {isModalOpen && (
                <div className={styles["modal-background"]} onClick={closeModal}>
                    <Modal closeModal={closeModal} />
                </div>
            )}
        </div>
    );
};

export default App;