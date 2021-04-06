import { TimetableViewModel } from './view-models/timetable-view-model';
import { i18n } from './i18n';

export function presentTimetable(): TimetableViewModel {
    return {
        title: i18n.timetableCreationTitle,
        inputName: i18n.timetableNameInput,
        submitButtonName: i18n.timetableSaveButtonName,
    };
}
