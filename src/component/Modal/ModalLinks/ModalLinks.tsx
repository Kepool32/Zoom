import React, { useState } from 'react';
import './ModalLinks.module.scss';
import { useStore } from "../../store/index";
import styles from './ModalLinks.module.scss';
import { FaRegCopy, FaCheckCircle } from 'react-icons/fa';

interface ModalLinksProps {
    closeModal: () => void;
}

const ModalLinks: React.FC<ModalLinksProps> = ({ closeModal }) => {
    const { createdMeetingData } = useStore();
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(createdMeetingData.join_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={closeModal}>×</span>
                <div className={styles.links} onClick={(event) => event.stopPropagation()}>
                    <div className={styles.section}>
                        <span className={styles.title}>Ваша Zoom встреча готова !</span>
                        <span>Подключиться:</span>
                        <a href={createdMeetingData?.start_url}>{createdMeetingData?.start_url}</a>
                    </div>
                    <div className={styles.sharelinks}>
                        <div className={styles.sharecopy}>
                            <span>Поделиться ссылкой:</span>
                            {copied ? (
                                <FaCheckCircle className="copied-icon" />
                            ) : (
                                <FaRegCopy className="share-icon" onClick={copyToClipboard} />
                            )}
                        </div>
                        <div className={styles.linkscopy}>
                            <a href={createdMeetingData?.join_url}>{createdMeetingData?.join_url}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalLinks;
