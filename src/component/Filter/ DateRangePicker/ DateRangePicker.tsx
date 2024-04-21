import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import styles from './DateRangePicker.module.scss';
import { useStore } from "../../store/index";

interface DateRangePickerProps {
    onSelect: (start: Date | null, end: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSelect }) => {
    const {
        fetchMeetingRecords,
        currentPage
    } = useStore();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isSelectingRange, setIsSelectingRange] = useState<boolean>(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
    const domain = (window as any)?.AMOCRM?.widgets?.system?.domain || "edormash.amocrm.ru";
    const perPage = 2;

    const handleDateChange = (dates: [Date | null, Date | null] | null) => {
        if (dates === null) {
            setStartDate(null);
            setEndDate(null);
            setIsSelectingRange(false);
            return;
        }

        const [start, end] = dates;
        if (!isSelectingRange) {
            setStartDate(start);
            setEndDate(null);
            setIsSelectingRange(true);
        } else {
            if (start && end && start <= end) {
                setStartDate(start);
                setEndDate(end);
            } else {
                setStartDate(end);
                setEndDate(start);
            }
        }
    };

    const handleReadyClick = () => {
        setIsDatePickerOpen(false);
        if (endDate || startDate) {
            onSelect && onSelect(startDate, endDate);
            fetchMeetingRecords(domain, currentPage, perPage,startDate, endDate);
        }
    };

    const handlePeriodButtonClick = (period: string) => {
        const today = new Date();
        let start = null;
        let end = null;
        switch (period) {
            case 'today':
                start = new Date(today);
                end = new Date(today);
                break;
            case 'yesterday':
                start = new Date(today);
                start.setDate(today.getDate() - 1);
                end = new Date(today);
                end.setDate(today.getDate() - 1);
                break;
            case 'thisWeek':
                start = new Date(today);
                start.setDate(today.getDate() - today.getDay());
                end = new Date(today);
                end.setDate(start.getDate() + 6);
                break;
            case 'lastWeek':
                start = new Date(today);
                start.setDate(today.getDate() - today.getDay() - 7);
                end = new Date(today);
                end.setDate(start.getDate() + 6);
                break;
            case 'thisMonth':
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case 'lastMonth':
                start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                end = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 'thisYear':
                start = new Date(today.getFullYear(), 0, 1);
                end = new Date(today.getFullYear(), 11, 31);
                break;
            default:
                break;
        }
        setStartDate(start);
        setEndDate(end);
        fetchMeetingRecords(domain, currentPage, perPage,start, end);
        setIsSelectingRange(false);
        onSelect && onSelect(start, end);
    };

    return (
        <div className={styles.dateRangePicker}>
            <div className={styles.datePickerContainer}>
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    // @ts-ignore
                    locale={ru}
                    dayClassName={() => `${styles.customDay}`}
                    calendarClassName={styles.customCalendar}
                    onFocus={() => setIsDatePickerOpen(!isDatePickerOpen)}
                />
                {isSelectingRange && (
                    <div>
                        <button className={styles.readyButton} onClick={handleReadyClick}>Готово</button>
                    </div>
                )}
            </div>

            <div className={styles.periodTable}>
                <div className={styles.periodCell} onClick={() => handlePeriodButtonClick('today')}>За сегодня</div>
                <div className={styles.periodCell} onClick={() => handlePeriodButtonClick('yesterday')}>За вчера</div>
                <div className={styles.periodCell} onClick={() => handlePeriodButtonClick('thisWeek')}>За неделю</div>
                <div className={styles.periodCell} onClick={() => handlePeriodButtonClick('lastWeek')}>За прошлую неделю</div>
                <div className={styles.periodCell} onClick={() => handlePeriodButtonClick('thisMonth')}>За месяц</div>
                <div className={styles.periodCell} onClick={() => handlePeriodButtonClick('lastMonth')}>За прошлый месяц</div>
                <div className={styles.periodCell} onClick={() => handlePeriodButtonClick('thisYear')}>За год</div>
            </div>
        </div>
    );
};

export default DateRangePicker;
