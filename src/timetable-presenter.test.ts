import { i18n } from './i18n';
import { presentTimetable } from './timetable-presenter';

it('should return empty view model given no arguments', () => {
    expect(presentTimetable()).toEqual({
        title: i18n.timetableCreationTitle,
        inputName: i18n.timetableNameInput,
        submitButtonName: i18n.timetableSaveButtonName,
    });
});
