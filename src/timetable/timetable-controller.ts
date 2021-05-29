import { fetchers } from '../api/fetchers';
import { Timetable } from '../api/models';
import { AppRoutes } from '../app-routes';

import { TimetableFormFields } from './models/timetable-form-fields-model';

export type TimetableControllerDeps = {
    saveHandler: typeof fetchers.saveTimetable;
    getTimetable: typeof fetchers.getTimetable;
    errorHandler: (error: Error) => void;
    redirectHandler: (path: string) => void;
    timetablePresenter: (timetable: Timetable | null) => void;
};

export function createTimetableController({
    saveHandler,
    getTimetable,
    errorHandler,
    redirectHandler,
    timetablePresenter,
}: TimetableControllerDeps) {
    return {
        async initializeTimetable(id?: string) {
            if (!id) {
                timetablePresenter(null);

                return;
            }

            try {
                timetablePresenter(await getTimetable(id));
            } catch (error) {
                errorHandler(error);
            }
        },
        async submit(formData: TimetableFormFields, timetableId?: string) {
            try {
                await saveHandler({
                    id: timetableId,
                    name: formData.name,
                });
                redirectHandler(AppRoutes.DEFAULT);
            } catch (error) {
                errorHandler(error);
            }
        },
    };
}
