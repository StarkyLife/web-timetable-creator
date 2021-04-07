import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchers } from '../api/fetchers';

import { Timetable } from './timetable-component';
import { createSubmitHandler } from './timetable-controller';
import { presentTimetable } from './timetable-presenter';

// eslint-disable-next-line no-alert
const errorHandler = () => alert('Something is wrong!');

export const NewTimetable: React.FC = () => {
    const newTimetableViewModel = presentTimetable();

    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const submitHandler = useCallback(
        createSubmitHandler(
            fetchers.saveTimetable,
            errorHandler,
            history.push,
        ),
        [history],
    );

    return <Timetable { ...newTimetableViewModel } onSubmit={ submitHandler } />;
};
