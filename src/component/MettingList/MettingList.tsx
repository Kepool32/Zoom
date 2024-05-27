import React, { useEffect, useState } from 'react';
import { useStore } from "../store/index";
import Loader from "../Loader/Loader";
import Pagination from "../pagination/Pagination";
import styles from "./MettingList.module.scss";
import MeetingItems from "./MettingItem/MettingItem";
import {WindowWithAMOCRM} from "../Modal/interface/WindowWithAMOCRM";

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
    const windowWithAMOCRM = window as WindowWithAMOCRM;
    const domain = (window as any)?.AMOCRM?.widgets?.system?.domain || "edormash.amocrm.ru";
    const id = windowWithAMOCRM.AMOCRM?.data?.current_card?.id || 0;
    const entity = windowWithAMOCRM.AMOCRM?.data?.current_entity || "Entity";
    const name = windowWithAMOCRM.AMOCRM?.data?.current_card?.user?.name || "Entity";
    const perPage = 3;

    useEffect(() => {
        fetchMeetingRecords(domain, currentPage, perPage,null,null,"",id,entity,name);
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
                        <MeetingItems
                            meetingRecords={meetingRecords}
                            formatDateString={formatDateString}
                            handleTranscriptRequest={handleTranscriptRequest}
                            handleContextMenu={handleContextMenu}
                            contextMenuId={contextMenuId}
                            isContextMenuVisible={isContextMenuVisible}
                        />
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            )}
        </>
    );
};

export default MeetingList;
