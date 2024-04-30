import React, { useState } from 'react';
import styles from './App.module.scss';
import Modal from "../Modal/Modal";

import {useStore} from "../store/index";
import {WindowWithAMOCRM} from "../Modal/interface/WindowWithAMOCRM";
import ModalLinks from "../Modal/ModalLinks/ModalLinks";

const App: React.FC = () => {
    const { createMeeting } = useStore();

    const windowWithAMOCRM = window as WindowWithAMOCRM;
    const domain = windowWithAMOCRM.AMOCRM?.widgets?.system?.domain || "edormash.amocrm.ru";
    const id = windowWithAMOCRM.AMOCRM?.data?.current_card?.id || 0;
    const entity = windowWithAMOCRM.AMOCRM?.data?.current_entity || "Entity";
    const name = windowWithAMOCRM.AMOCRM?.data?.current_card?.user?.name || "Entity";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLinksOpen, setIsModalLinksOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModalLinks = () => {
        createMeeting(domain, name, entity, id)
        setIsModalLinksOpen(true);
    };

    const closeModalLinks = () => {
        setIsModalLinksOpen(false);
    };

    return (
        <div className={styles.App}>
            <div className={styles["select-menu"]}>
                <span className={styles["select-options"]}>Выберите опцию</span>
                <div className={styles["select-buttons"]}>
                    <button className={styles["create-meeting-button"]} onClick={openModalLinks}>Создать встречу в Zoom</button>
                    <button className={styles["create-meeting-button"]} onClick={openModal}>Открыть встречи</button>
                </div>
            </div>
            {isModalOpen && (
                <div className={styles["modal-background"]} onClick={closeModal}>
                    <Modal closeModal={closeModal} />
                </div>
            )}
            {isModalLinksOpen && (
                <div className={styles["modal-background"]} onClick={closeModalLinks}>
                    <ModalLinks closeModal={closeModalLinks} />
                </div>
            )}
        </div>
    );
};

export default App;
