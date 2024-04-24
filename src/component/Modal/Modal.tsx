import React from 'react';
import styles from "./Modal.module.scss";
import MeetingList from "../MettingList/MettingList";
import FilterSearch from "../Filter/FilterSearch";
import MySvgImage1 from '../../assets/SLMlogo.svg';



interface ModalProps {
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }) => {


    return (
        <div className={styles["modal-container"]}>
            <div className={styles["modal-logo"]}>
                <div className={styles["modal-slm"]}>
                    <img src={MySvgImage1} alt="" />
                    <span>SlMZoom</span>
                </div>

                <span className={styles.closeButton} onClick={closeModal}>×</span>
            </div>
            <div className={styles["modal-content"]} onClick={(event) => event.stopPropagation()}>
                <FilterSearch/>
                <span className={styles["meeting-title"]}>Список встреч</span>
                <MeetingList />
            </div>
        </div>
    );
};

export default Modal;