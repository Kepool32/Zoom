import React, { useEffect } from 'react';
import { useStore } from "../store/index";
import Loader from "../Loader/Loader";
import Pagination from "../pagination/Pagination";
import styles from "./MettingList.module.scss";


const MeetingList: React.FC = () => {
    const { meetingRecords, isLoading, fetchMeetingRecords, currentPage, totalPages, setCurrentPage } = useStore();
    const domain = window?.AMOCRM?.widgets?.system.domain || "testdomain";
    const perPage = 3;

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
                                                <a key={index} href={meeting.record_link} target="_blank" rel="noopener noreferrer">{meeting.record_link}</a>
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
