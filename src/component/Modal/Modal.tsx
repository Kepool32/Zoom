import React, { useRef } from 'react';
import { useStore } from "../store/index";
import styles from "./Modal.module.scss";
import MeetingList from "../MettingList/MettingList";
import {WindowWithAMOCRM} from "./interface/WindowWithAMOCRM";


const Modal: React.FC = () => {
    const { modalIsOpen, setModalIsOpen, createMeeting } = useStore();
    const modalRef = useRef<HTMLDivElement>(null); // Создаем ссылку на элемент модального окна

    const windowWithAMOCRM = window as WindowWithAMOCRM;
    const domain = windowWithAMOCRM.AMOCRM?.widgets?.system?.domain || "testdomain";
    const id = windowWithAMOCRM.AMOCRM?.data?.current_card?.id || 0;
    const entity = windowWithAMOCRM.AMOCRM?.data?.current_entity || "Entity";
    const name = windowWithAMOCRM.AMOCRM?.data?.current_card?.user?.name || "Entity";



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
