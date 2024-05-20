import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";


export const fetchMeetingRecords = async (domain: string, page: number, perPage: number,dateFrom?:Date | null,dateTo?:Date | null ,  searchName?:string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/records`, { domain, page, perPage,dateFrom,dateTo, searchName});
        return response.data;
    } catch (error) {
        console.error('Error fetching meeting records:', error);
        throw error;
    }
};

export const createMeeting = async (domain: string, firstName: string, entity: string, entityId: number) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/meetings`, { domain, first_name: firstName, entity, entity_id: entityId });

        return response.data.data || response.data.message;

    } catch (error) {
        console.error('Error creating meeting:', error);
        throw error;
    }
};

export const fetchTranscript = async (domain: string, recordId: number) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/records/${recordId}/transcript`,  { domain } );
        return response.data;
    } catch (error) {
        console.error('Error fetching transcript:', error);
        throw error;
    }
};
