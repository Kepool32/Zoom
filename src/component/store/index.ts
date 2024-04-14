import create from 'zustand';
import { fetchMeetingRecords, createMeeting } from '../services/api';

interface AppState {
    modalIsOpen: boolean;
    setModalIsOpen: (isOpen: boolean) => void;
    meetingRecords: any[];
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    fetchMeetingRecords: (domain: string, page: number, perPage: number) => Promise<void>;
    createMeeting: (domain: string, firstName: string, entity: string, entityId: number) => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
    modalIsOpen: false,
    setModalIsOpen: (isOpen) => set({ modalIsOpen: isOpen }),
    meetingRecords: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    fetchMeetingRecords: async (domain, page, perPage) => {
        set({ isLoading: true });
        try {
            const response = await fetchMeetingRecords(domain, page, perPage);
            set({ meetingRecords: response.data, totalPages: response.last_page });
        } catch (error) {
            console.error('Error fetching meeting records:', error);
        } finally {
            set({ isLoading: false });
        }
    },
    createMeeting: async (domain, firstName, entity, entityId) => {
        try {
            await createMeeting(domain, firstName, entity, entityId);
            set({ currentPage: 1 });
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    },
}));
