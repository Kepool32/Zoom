import React, { useEffect, useState } from 'react';
import { useStore } from "../store/index";
import Loader from "../Loader/Loader";
import Pagination from "../pagination/Pagination";
import styles from "./MettingList.module.scss";
import MySvgImage from '../../assets/Frame 6.svg';

const MeetingList: React.FC = () => {
    const {
        meetingRecords,
        isLoading,
        fetchMeetingRecords,
        fetchTranscript,
        currentPage,
        totalPages,
        setCurrentPage
    } = useStore();
    const [contextMenuId, setContextMenuId] = useState<number | null>(null);
    const [isContextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
    const domain = (window as any)?.AMOCRM?.widgets?.system?.domain || "edormash.amocrm.ru";
    const perPage = 2;

    useEffect(() => {
        fetchMeetingRecords(domain, currentPage, perPage);
    }, [fetchMeetingRecords, domain, currentPage, perPage]);

    const formatDateString = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('ru-RU', options);
        return formattedDate;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleTranscriptRequest = async (meetingId: number) => {
        try {
            await fetchTranscript(domain, meetingId);
        } catch (error) {
            console.error('Error fetching transcript:', error);
        }
    };

    const handleContextMenu = (meetingId: number) => {
        if (contextMenuId === meetingId) {
            setContextMenuId(null);
            setContextMenuVisible(false);
        } else {
            setContextMenuId(meetingId);
            setContextMenuVisible(true);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
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
                                                        <div className={styles["record-date-item"]}>{formatDateString(record.created_at)}</div>
                                                        <div className={styles["download-link-container"]}>
                                                            <div className={styles["download-links-container"]}>
                                                                <a href={meeting.record_link}>Ссылка на скачивание</a>
                                                                {meeting.transcript_status === 1 && (

                                                                    <a href={meeting.transcript_link}>Ссылка на транскрипцию</a>

                                                                )}
                                                            </div>

                                                            {!meeting.transcript_status && (
                                                                <div className={styles["context-menu"]}>
                                                                    <div className={styles["context-menu-icon"]} onClick={() => handleContextMenu( meeting.id)}>&#8942;</div>
                                                                    {contextMenuId === meeting.id && isContextMenuVisible && (
                                                                        <div className={styles["context-menu-items"]}>
                                                                            <div className={styles["context-menu-item"]} onClick={() => handleTranscriptRequest(meeting.id)}>Расшифровать запись</div>
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
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            )}
        </>
    );
};

export default MeetingList;
