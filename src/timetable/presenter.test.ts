import { Timetable } from '../api/models';
import { i18n } from '../i18n';

import { TimetableViewModel } from './models/timetable-view-model';
import { presentTimetable } from './presenter';

const EMPTY_TIMETABLE_VIEW_MODEL: TimetableViewModel = {
    title: i18n.timetableCreationTitle,
    timetableName: {
        label: i18n.timetableNameInput,
        value: '',
    },
    submitButtonName: i18n.timetableSaveButtonName,
};

it('should return empty view model given no timetable', () => {
    expect(
        presentTimetable(null),
    ).toEqual(
        EMPTY_TIMETABLE_VIEW_MODEL,
    );
});

it('should return view model with inputs values given timetable', () => {
    const TIMETABLE: Timetable = {
        id: 'id',
        name: 'timetable',
    };

    expect(
        presentTimetable(TIMETABLE),
    ).toEqual({
        ...EMPTY_TIMETABLE_VIEW_MODEL,
        id: TIMETABLE.id,
        timetableName: {
            ...EMPTY_TIMETABLE_VIEW_MODEL.timetableName,
            value: TIMETABLE.name,
        },
    });
});
