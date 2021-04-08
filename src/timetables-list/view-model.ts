export type TimetablesListItemViewModel = {
    id: string;
    name: string;
    deleteButtonName: string;
};

export type TimetablesListViewModel = {
    title: string;
    timetables?: TimetablesListItemViewModel[];
    createNewTimetableButtonName: string;
};
