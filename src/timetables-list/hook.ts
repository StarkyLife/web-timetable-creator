import {
    useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { fetchers } from '../api/fetchers';

import { createTimetablesListController } from './controller';
import { presentTimetablesList } from './presenter';
import { TimetablesListViewModel } from './view-model';

export function useTimetablesListController() {
    const history = useHistory();

    const [timetablesListVM, setTimetablesVM] = useState<TimetablesListViewModel | null>(null);

    const controller = useMemo(() => createTimetablesListController({
        timetablesFetcher: fetchers.getTimetablesShortInfoList,
        timetableDeleteFetcher: fetchers.deleteTimetable,
        timetablesPresenter: (timetables) => {
            setTimetablesVM(presentTimetablesList(timetables));
        },
        redirectHandler: history.push,
        // eslint-disable-next-line no-alert
        errorHandler: (error) => alert(error),
    }), [setTimetablesVM, history]);

    useEffect(() => {
        controller.initializeTimetablesList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTimetableCreate = useCallback(() => {
        controller.createNewTimetable();
    }, [controller]);

    const handleTimetableDelete = useCallback((id: string) => {
        controller.deleteTimetable(id);
    }, [controller]);

    return {
        timetablesListVM,
        handleTimetableDelete,
        handleTimetableCreate,
    };
}
