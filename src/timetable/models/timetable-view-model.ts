import { TimetableFormFields } from './timetable-form-fields-model';

export type TimetableViewModel = {
    id?: string;
    title: string;
    formData: TimetableFormFields;
    timetableNameInput: {
        label: string;
    };
    newSubjectInput: {
        label: string;
    };
    submitButtonName: string;
};
