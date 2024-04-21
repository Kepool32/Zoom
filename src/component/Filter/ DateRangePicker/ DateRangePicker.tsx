import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import styles from './DateRangePicker.module.scss';
import { useStore } from "../../store/index";

const DateRangePicker = ({ onSelect }) => {
    const { fetchMeetingRecords, currentPage } = useStore();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isSelectingRange, setIsSelectingRange] = useState(false);
    const domain = (window as any)?.AMOCRM?.widgets?.system?.domain || "edormash.amocrm.ru";
    const perPage = 2;

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        if (!isSelectingRange) {
            setStartDate(start);
            setEndDate(null);
            setIsSelectingRange(true);
        } else {
            if (start <= endDate) {
                setStartDate(start);
                setEndDate(end);
            } else {
                setStartDate(end);
                setEndDate(start);
            }
        }
    };

    const handleReadyClick = () => {
        onSelect && onSelect(endDate, startDate);
        fetchMeetingRecords(domain, currentPage, perPage, endDate, startDate);
    };

    const handlePeriodButtonClick = (period) => {
        const today = new Date();
        let start, end;
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
        setIsSelectingRange(false);
        fetchMeetingRecords(domain, currentPage, perPage, start, end);
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
                    locale={ru}
                    dayClassName={(date) => `${styles.customDay}`}
                    calendarClassName={styles.customCalendar}
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
