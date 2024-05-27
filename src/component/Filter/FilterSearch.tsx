import React, {useState, memo, useEffect, useCallback} from 'react';
import styles from './FilterSearch.module.scss';
import { RiSearchLine } from "react-icons/ri";
import { MdDateRange } from 'react-icons/md';
import DateRangePicker from "./ DateRangePicker/ DateRangePicker";
import {useStore} from "../store/index";
import SearchIcon from '../../assets/searchName.svg';
import debounce from 'lodash.debounce';
import {WindowWithAMOCRM} from "../Modal/interface/WindowWithAMOCRM";

const FilterSearch: React.FC = memo(() => {
    const {
        fetchMeetingRecords,
        currentPage
    } = useStore();
    const [searchName, setSearchName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDataPicker, setShowDataPicker] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<{ startDate: Date | null, endDate: Date | null }>({ startDate: null, endDate: null });
    const windowWithAMOCRM = window as WindowWithAMOCRM;
    const domain = (window as any)?.AMOCRM?.widgets?.system?.domain || "edormash.amocrm.ru";
    const id = windowWithAMOCRM.AMOCRM?.data?.current_card?.id || 0;
    const entity = windowWithAMOCRM.AMOCRM?.data?.current_entity || "Entity";
    const name = windowWithAMOCRM.AMOCRM?.data?.current_card?.user?.name || "Entity";

    const perPage = 3;

    const debouncedFetch = useCallback(
        debounce((searchName: string | undefined, dateFrom: Date | null, dateTo: Date | null) => {
            fetchMeetingRecords(domain, currentPage, perPage, dateFrom, dateTo, searchName,id,entity,name);
        }, 500),
        [fetchMeetingRecords, domain, currentPage, perPage]
    );

    useEffect(() => {
        debouncedFetch(searchName,
            selectedPeriod.startDate,
            selectedPeriod.endDate);

        return () => {
            debouncedFetch.cancel();
        };
    }, [searchName]);

    const handleFilterClick = () => {
        setShowModal(!showModal);
        setShowDataPicker(false);
    };

    const handleDateRangeClick = () => {
        setShowDataPicker(!showDataPicker);
    };

    const handleSelectPeriod = (startDate:null | Date, endDate:null | Date) => {
        setSelectedPeriod({ startDate, endDate });
        handleDateRangeClick()
    };

    const handleResetFilter = () => {
        setSelectedPeriod({ startDate: null, endDate: null })
        setSearchName('');
        fetchMeetingRecords(domain, currentPage, perPage,null,null,"",id,entity,name);

    };

    return (
        <div className={styles.container}>
            <button className={styles.searchFilterButton} onClick={handleFilterClick}>
                <RiSearchLine className={styles.searchIcon} />
                Поиск и фильтр
            </button>

            {showModal && (
                <div className={`${styles.modal} ${showModal && styles.active}`}>
                    <div className={styles.resetFilter} onClick={handleResetFilter}>
                        <span className={styles.resetFilterText}>Сбросить фильтр</span>
                    </div>
                    <div className={styles.filterContainer}>
                        <button className={styles.allTimeButton}>
                            <img src={SearchIcon} alt="" />
                            <input
                                type="text"
                                placeholder="Название"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className={styles.inputSearch}
                            />
                        </button>
                        <button className={styles.allTimeButton} onClick={handleDateRangeClick}>
                            <MdDateRange className={styles.calendarIcon} />
                            {selectedPeriod.startDate || selectedPeriod.endDate ? (
                                <>
                                    {selectedPeriod?.startDate?.toLocaleDateString() || ""} - {selectedPeriod?.endDate?.toLocaleDateString() || ""}
                                </>
                            ) : (
                                "За все время"
                            )}
                        </button>
                    </div>
                </div>
            )}

            {showDataPicker && <DateRangePicker onSelect={handleSelectPeriod} />}
        </div>
    );
});

export default FilterSearch;
