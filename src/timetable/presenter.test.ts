import { Timetable } from '../api/models';
import { i18n } from '../i18n';

import { TimetableViewModel } from './models/timetable-view-model';
import { EMPTY_TIMETABLE_FORM_FIELDS } from './test-data/form-fields-mocks';
import { presentTimetable } from './presenter';

const EMPTY_TIMETABLE_VIEW_MODEL: TimetableViewModel = {
    title: i18n.timetableCreationTitle,
    formData: EMPTY_TIMETABLE_FORM_FIELDS,
    timetableNameInput: {
        label: i18n.timetableNameInput,
    },
    subjectsTitle: i18n.timetableSubjectsTitle,
    newSubjectInput: {
        label: i18n.timetableNewSubjectInput,
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
        formData: {
            ...EMPTY_TIMETABLE_VIEW_MODEL.formData,
            name: TIMETABLE.name,
        },
    });
});
