import React from 'react';

import { Timetable } from './timetable';
import { presentTimetable } from './timetable-presenter';

export const NewTimetable: React.FC = () => {
    const newTimetableViewModel = presentTimetable();

    return <Timetable { ...newTimetableViewModel } />;
};
