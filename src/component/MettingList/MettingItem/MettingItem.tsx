import React, {useState} from 'react';
import styles from "./MettingItem.module.scss";
import MySvgImage from "../../../assets/CameraLogo.svg"

interface MeetingItemsProps {
    meetingRecords: any[];
    formatDateString: (dateString: string) => string;
    handleTranscriptRequest: (meetingId: number) => void;
    handleContextMenu: (meetingId: number) => void;
    contextMenuId: number | null;
    isContextMenuVisible: boolean;

}

const MeetingItems: React.FC<MeetingItemsProps> = ({
                                                       meetingRecords,
                                                       formatDateString,
                                                       handleTranscriptRequest,
                                                       handleContextMenu,
                                                       contextMenuId,
                                                       isContextMenuVisible,
                                                   }) => {
    const [transcriptRequested, setTranscriptRequested] = useState<{ [key: number]: boolean }>({});

    const handleTranscriptRequestClick = async (meetingId: number) => {
        try {
            await handleTranscriptRequest(meetingId);
            setTranscriptRequested((prevState) => ({
                ...prevState,
                [meetingId]: true,
            }));
        } catch (error) {
            console.error('Error fetching transcript:', error);
        }
    };

    return (
        <div className={styles["record-content-item"]}>
            <ul className={styles["meeting-list"]}>
                {meetingRecords.map((record: any, index: number) => (
                    <li key={index} className={styles["meeting-item"]}>
                        <div className={styles["record-item"]}>
                            <div className={styles["record-links"]}>
                                <img src={MySvgImage} alt="" />
                                <div>
                                    {record.records.map((meeting: any, index: number) => (
                                        <div key={index} className={styles["record-links-item"]}>
                                            <div className={styles["record-date-item"]}>
                                                {formatDateString(record.created_at)}
                                            </div>
                                            <div className={styles["download-link-container"]}>
                                                <div className={styles["download-links-container"]}>
                                                    <a href={meeting.record_link}>Ссылка на скачивание</a>
                                                    {meeting.transcript_status === 1 && (
                                                        <a href={meeting.transcript_link}>
                                                            Ссылка на транскрипцию
                                                        </a>
                                                    )}
                                                </div>
                                                {!meeting.transcript_status && (
                                                    <div className={styles["context-menu"]}>
                                                        <div
                                                            className={styles["context-menu-icon"]}
                                                            onClick={() => handleContextMenu(meeting.id)}
                                                        >
                                                            &#8942;
                                                        </div>
                                                        {contextMenuId === meeting.id && isContextMenuVisible && (
                                                            <div className={styles["context-menu-items"]}>
                                                                <div
                                                                    className={styles["context-menu-item"]}
                                                                    onClick={() =>
                                                                        handleTranscriptRequestClick(meeting.id)
                                                                    }
                                                                >
                                                                    {transcriptRequested[meeting.id]
                                                                        ? "Расшифровка отправлена"
                                                                        : "Расшифровать запись"}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MeetingItems;