export interface MeetingRecord {
    id: number;
    source: string;
    domain: string;
    chat_id: number | null;
    telegram_user_id: number | null;
    created_at: string;
    entity: string;
    entity_id: string;
    records: MeetingRecordDetail[];
}

interface MeetingRecordDetail {
    id: number;
    meeting_id: number;
    record_link: string;
    transcript_link: string;
    transcript_requested: number;
    transcript_status: number;
}