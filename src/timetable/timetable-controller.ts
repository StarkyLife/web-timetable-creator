import { fetchers } from '../api/fetchers';
import { AppRoutes } from '../app-routes';

import { TimetableFormFields } from './models/timetable-form-fields-model';

export type TimetableSubmitErrorHandler = (error: Error) => void;
export type TimetableSubmitRedirectHandler = (path: string) => void;
export type TimetableSubmitSaveHandler = typeof fetchers.saveTimetable;

export function createSubmitHandler(
    saveHandler: TimetableSubmitSaveHandler,
    errorHandler: TimetableSubmitErrorHandler,
    redirectHandler: TimetableSubmitRedirectHandler,
) {
    return async (formData: TimetableFormFields) => {
        try {
            await saveHandler(formData);
            redirectHandler(AppRoutes.DEFAULT);
        } catch (error) {
            errorHandler(error);
        }
    };
}
