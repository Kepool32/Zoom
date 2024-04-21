import React from 'react';
import styles from "./Modal.module.scss";
import MeetingList from "../MettingList/MettingList";
import { WindowWithAMOCRM } from "./interface/WindowWithAMOCRM";
import FilterSearch from "../Filter/FilterSearch";
import MySvgImage1 from '../../assets/Frame 7.svg';
/*import MySvgImage2 from '../../assets/Frame 5.svg';*/
import {useStore} from "../store/index";


interface ModalProps {
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
    const { createMeeting } = useStore();

    const windowWithAMOCRM = window as WindowWithAMOCRM;
    const domain = windowWithAMOCRM.AMOCRM?.widgets?.system?.domain || "edormash.amocrm.ru";
    const id = windowWithAMOCRM.AMOCRM?.data?.current_card?.id || 0;
    const entity = windowWithAMOCRM.AMOCRM?.data?.current_entity || "Entity";
    const name = windowWithAMOCRM.AMOCRM?.data?.current_card?.user?.name || "Entity";

    return (
        <div className={styles["modal-container"]}>
            <div className={styles["modal-logo"]}>
                <img src={MySvgImage1} alt="" />
              {/*  <img src={MySvgImage2} alt="" className={styles["close-icon"]} onClick={closeModal} />*/}
            </div>
            <div className={styles["modal-content"]} onClick={(event) => event.stopPropagation()}>
                <FilterSearch/>
                <div className={styles["modal-button-content"]}>
                    <button className={styles["create-meeting-button"]} onClick={() => createMeeting(domain, name, entity, id)}>Создать встречу в Zoom</button>
                </div>
                <span className={styles["meeting-title"]}>Список встреч</span>
                <MeetingList />
            </div>
        </div>
    );
};

export default Modal;