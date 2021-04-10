import { fetchers } from '../api/fetchers';
import { AppRoutes } from '../app-routes';

import { TimetableFormFields } from './models/timetable-form-fields-model';

export type TimetableControllerDeps = {
    saveHandler: typeof fetchers.saveTimetable;
    errorHandler: (error: Error) => void;
    redirectHandler: (path: string) => void;
};

export function createTimetableController({
    saveHandler,
    errorHandler,
    redirectHandler,
}: TimetableControllerDeps) {
    return {
        async submit(formData: TimetableFormFields) {
            try {
                await saveHandler(formData);
                redirectHandler(AppRoutes.DEFAULT);
            } catch (error) {
                errorHandler(error);
            }
        },
    };
}
