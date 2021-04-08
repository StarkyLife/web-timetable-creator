import { i18n } from '../i18n';

import { TimetableViewModel } from './models/timetable-view-model';

export function presentTimetable(): TimetableViewModel {
    return {
        title: i18n.timetableCreationTitle,
        inputName: i18n.timetableNameInput,
        submitButtonName: i18n.timetableSaveButtonName,
    };
}
