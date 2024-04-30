export interface DateRangePickerProps {
    onSelect: (start: Date | null, end: Date | null) => void;
}


export type PeriodLabels = {
    today: string;
    yesterday: string;
    thisWeek: string;
    lastWeek: string;
    thisMonth: string;
    lastMonth: string;
    thisYear: string;
    [key: string]: string;
};