import React, { useEffect, useState } from 'react';
import { useStore } from "../store/index";
import Loader from "../Loader/Loader";
import Pagination from "../pagination/Pagination";
import styles from "./MettingList.module.scss";

const MeetingList: React.FC = () => {
    const { meetingRecords, isLoading, fetchMeetingRecords, fetchTranscript, currentPage, totalPages, setCurrentPage } = useStore();
    const [requestedTranscriptIds, setRequestedTranscriptIds] = useState<number[]>([]);
    const domain = (window as any)?.AMOCRM?.widgets?.system?.domain || "testdomain";
    const perPage = 2;

    useEffect(() => {
        fetchMeetingRecords(domain, currentPage, perPage);
    }, [fetchMeetingRecords, domain, currentPage, perPage]);

    useEffect(() => {
        // Обновляем состояние requestedTranscriptIds при каждом обновлении meetingRecords
        const newRequestedTranscriptIds: number[] = [];
        meetingRecords.forEach((record: any) => {
            record.records.forEach((meeting: any) => {
                if (meeting.transcript_requested === 1) {
                    newRequestedTranscriptIds.push(meeting.id);
                }
            });
        });
        setRequestedTranscriptIds(newRequestedTranscriptIds);
    }, [meetingRecords]);

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
            setRequestedTranscriptIds(prevState => [...prevState, meetingId]);
            await fetchTranscript(domain, meetingId);
        } catch (error) {
            console.error('Error fetching transcript:', error);
            setRequestedTranscriptIds(prevState => prevState.filter(id => id !== meetingId));
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
                                        <div>{formatDateString(record.created_at)}</div>
                                        <div className={styles["record-links"]}>
                                            {record.records.map((meeting: any, index: number) => (
                                                <div key={index} className={styles["record-links-item"]}>
                                                    <div>
                                                        <a href={meeting.record_link}>Ссылка на скачивание</a>
                                                    </div>
                                                    {meeting.transcript_status === 0 && (
                                                        <div>
                                                            <button
                                                                className={`${styles["request-transcript-button"]} ${requestedTranscriptIds.includes(meeting.id) ? styles["disabled"] : ""}`}
                                                                onClick={() => handleTranscriptRequest(meeting.id)}
                                                                disabled={requestedTranscriptIds.includes(meeting.id) || meeting.transcript_requested === 1}
                                                            >
                                                                {requestedTranscriptIds.includes(meeting.id) ? "Запрос отправлен" : "Запросить транскрипцию"}
                                                            </button>
                                                        </div>
                                                    )}
                                                    {meeting.transcript_link && (
                                                        <div>
                                                            <a href={meeting.transcript_link} className={styles["transcript-download-link"]}>Ссылка на скачивание транскрипции</a>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
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
