import React, { useState } from 'react';
import './ModalLinks.module.scss';
import { useStore } from "../../store/index";
import styles from './ModalLinks.module.scss';
import { FaRegCopy, FaCheckCircle } from 'react-icons/fa';
import Loader from "../../Loader/Loader";

interface ModalLinksProps {
    closeModal: () => void;
}

const ModalLinks: React.FC<ModalLinksProps> = ({ closeModal }) => {
    const { createdMeetingData } = useStore();
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (createdMeetingData !== null) {
            navigator.clipboard.writeText(createdMeetingData.join_url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
        {createdMeetingData ? (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.closeButton} onClick={closeModal}>×</span>
                        <div className={styles.links} onClick={(event) => event.stopPropagation()}>
                            <div className={styles.section}>
                                <span className={styles.title}>Ваша Zoom встреча готова !</span>
                                <span>Подключиться:</span>
                                <a href={createdMeetingData.start_url} target="_blank">{createdMeetingData.start_url}</a>
                            </div>
                            <div className={styles.sharelinks}>
                                <div className={styles.sharecopy} onClick={copyToClipboard}>
                                    <span>Поделиться ссылкой:</span>
                                    {copied ? (
                                        <FaCheckCircle className="copied-icon" />
                                    ) : (
                                        <FaRegCopy className="share-icon"  />
                                    )}
                                </div>
                                <div className={styles.linkscopy}>
                                    <a href={createdMeetingData.join_url} target="_blank">{createdMeetingData.join_url}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ModalLinks;
