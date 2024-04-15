import React, { useEffect } from 'react';
import { useStore } from "../store/index";
import Loader from "../Loader/Loader";
import Pagination from "../pagination/Pagination";
import styles from "./MettingList.module.scss";

const MeetingList: React.FC = () => {
    const { meetingRecords, isLoading, fetchMeetingRecords, fetchTranscript, currentPage, totalPages, setCurrentPage } = useStore();
    const domain = (window as any)?.AMOCRM?.widgets?.system?.domain || "testdomain";
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

    const handleTranscriptRequest = async (recordId: number) => {
        try {
            await fetchTranscript(domain, recordId);

        } catch (error) {
            console.error('Error fetching transcript:', error);

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
                                                <div key={index}>
                                                    <a href={meeting.record_link}>Ссылка на скачивание</a>
                                                    {meeting.transcript_status === 0 ? (
                                                        <button
                                                            className={styles["request-transcript-button"]}
                                                            onClick={() => handleTranscriptRequest(meeting.id)}
                                                            disabled={meeting.transcript_status === 1}
                                                        >
                                                            Запросить транскрипцию
                                                        </button>
                                                    ) : (
                                                        <span>Запрос отправлен</span>
                                                    )}
                                                    {meeting.transcript_link && (
                                                        <a href={meeting.transcript_link}>Ссылка на скачивание транскрипции</a>
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
