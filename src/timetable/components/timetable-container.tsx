import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import { fetchers } from '../../api/fetchers';
import { TimetableViewModel } from '../models/timetable-view-model';
import { presentTimetable } from '../presenter';
import { createTimetableController } from '../timetable-controller';

import { Timetable } from './timetable-form';

// eslint-disable-next-line no-alert
const errorHandler = () => alert('Something is wrong!');

export const TimetableContainer: React.FC = () => {
    const history = useHistory();

    const [viewModel, setViewModel] = useState<TimetableViewModel | null>(null);

    const controller = useMemo(() => createTimetableController({
        saveHandler: fetchers.saveTimetable,
        getTimetable: fetchers.getTimetable,
        errorHandler,
        redirectHandler: history.push,
        timetablePresenter: (timetable) => {
            setViewModel(presentTimetable(timetable));
        },
    }), [history]);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        controller.initializeTimetable(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!viewModel) {
        return <CircularProgress />;
    }

    return <Timetable { ...viewModel } onSubmit={ controller.submit } />;
};
