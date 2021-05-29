import { Timetable } from '../api/models';
import { i18n } from '../i18n';

import { TimetableViewModel } from './models/timetable-view-model';

export function presentTimetable(
    timetable: Timetable | null,
): TimetableViewModel {
    return {
        id: timetable?.id,
        title: i18n.timetableCreationTitle,
        submitButtonName: i18n.timetableSaveButtonName,
        formData: {
            name: timetable?.name ?? '',
            newSubject: '',
            subjects: [],
        },
        timetableNameInput: {
            label: i18n.timetableNameInput,
        },
        subjectsTitle: i18n.timetableSubjectsTitle,
        newSubjectInput: {
            label: i18n.timetableNewSubjectInput,
        },
    };
}
