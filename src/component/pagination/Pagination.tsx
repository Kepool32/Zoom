import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className={styles.pagination}>
            <button className={styles.paginationButton} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                <span className={styles.paginationIcon}>&lt;</span>
            </button>
            <span className={styles.paginationInfo}> {currentPage} из {totalPages}</span>
            <button className={styles.paginationButton} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <span className={styles.paginationIcon}>&gt;</span>
            </button>
        </div>

    );
};

export default Pagination;
