import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchers } from '../../api/fetchers';
import { createTimetableController } from '../timetable-controller';
import { presentTimetable } from '../timetable-presenter';

import { Timetable } from './timetable-form';

// eslint-disable-next-line no-alert
const errorHandler = () => alert('Something is wrong!');

export const NewTimetable: React.FC = () => {
    const newTimetableViewModel = presentTimetable();

    const history = useHistory();

    const controller = useMemo(() => createTimetableController({
        saveHandler: fetchers.saveTimetable,
        errorHandler,
        redirectHandler: history.push,
    }), [history]);

    return <Timetable { ...newTimetableViewModel } onSubmit={ controller.submit } />;
};
