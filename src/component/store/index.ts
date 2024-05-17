import create from 'zustand';
import { fetchMeetingRecords, createMeeting, fetchTranscript } from '../services/api';
import {MeetingData, MeetingRecord} from "./interface/Metting";

interface AppState {
    modalIsOpen: boolean;
    meetingRecords: MeetingRecord[];
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    createdMeetingData: MeetingData | null;
    fetchMeetingRecords: (domain: string, page: number, perPage: number, dateFrom?: Date | null, dateTo?: Date | null) => Promise<void>;
    createMeeting: (domain: string, firstName: string, entity: string, entityId: number) => Promise<void>;
    setCurrentPage: (page: number) => void;
    fetchTranscript: (domain: string, recordId: number) => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
    modalIsOpen: false,
    setModalIsOpen: (isOpen: boolean) => set({ modalIsOpen: isOpen }),
    meetingRecords: [],
    currentPage: 1,
    totalPages: 3,
    isLoading: false,
    createdMeetingData: null,
    setCurrentPage: (page: number) => set({ currentPage: page }),
    fetchMeetingRecords: async (domain, page, perPage, dateFrom?, dateTo?) => {
        set({ isLoading: true });
        try {
            const response = await fetchMeetingRecords(domain, page, perPage, dateFrom, dateTo);
            set({ meetingRecords: response.data, totalPages: response.last_page });
        } catch (error) {
            console.error('Error fetching meeting records:', error);
        } finally {
            set({ isLoading: false });
        }
    },
    createMeeting: async (domain, firstName, entity, entityId) => {
        try {
            const responseData: MeetingData[] = await createMeeting(domain, firstName, entity, entityId);
            set({ createdMeetingData: responseData?.data, currentPage: 1 });

        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    },
    fetchTranscript: async (domain, recordId) => {
        try {
            await fetchTranscript(domain, recordId);
        } catch (error) {
            console.error('Error fetching transcript:', error);
        }
    }
}));
