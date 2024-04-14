import React, { useRef } from 'react';
import { useStore } from "../store/index";
import styles from "./Modal.module.scss";
import MeetingList from "../MettingList/MettingList";

const Modal: React.FC = () => {
    const { modalIsOpen, setModalIsOpen, createMeeting } = useStore();
    const modalRef = useRef<HTMLDivElement>(null); // Создаем ссылку на элемент модального окна

    const id = window?.AMOCRM?.data?.current_card?.id || 0;
    const entity = window?.AMOCRM?.data?.current_entity || "Entity";
    const name = window?.AMOCRM?.data?.current_card?.user.name || "Entity";
    const domain = window?.AMOCRM?.widgets?.system.domain || "testdomain";


    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setModalIsOpen(false);
        }
    };

    return (
        <>
            {modalIsOpen && (
                <div className={styles["modal-overlay"]} onClick={handleOutsideClick}>
                    <div ref={modalRef} className={styles["modal-content"]}>
                        <button className={styles["create-meeting-button"]} onClick={() => createMeeting(domain, name, entity, id)}>Создать встречу</button>
                        <span className={styles["meeting-title"]}>Список встреч</span>
                        <MeetingList />
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
