import { fetchers } from '../api/fetchers';
import { Timetable } from '../api/models';
import { AppRoutes } from '../app-routes';
import { i18n } from '../i18n';

import { TimetableFormFields } from './models/timetable-form-fields-model';
import { TimetableViewModel } from './models/timetable-view-model';

export type TimetableControllerDeps = {
    saveHandler: typeof fetchers.saveTimetable;
    getTimetable: typeof fetchers.getTimetable;
    errorHandler: (error: Error) => void;
    redirectHandler: (path: string) => void;
};

export function createTimetableController({
    saveHandler,
    getTimetable,
    errorHandler,
    redirectHandler,
}: TimetableControllerDeps) {
    return {
        async initializeTimetable(id?: string): Promise<TimetableViewModel | null> {
            let timetable: Timetable | null = null;

            if (id) {
                try {
                    timetable = await getTimetable(id);
                } catch (error) {
                    errorHandler(error);

                    return null;
                }
            }

            return {
                id: timetable?.id,
                title: i18n.timetableCreationTitle,
                submitButtonName: i18n.timetableSaveButtonName,
                timetableName: {
                    label: i18n.timetableNameInput,
                    value: timetable?.name ?? '',
                },
            };
        },
        async submit(formData: TimetableFormFields, timetableId?: string) {
            try {
                await saveHandler({
                    ...formData,
                    id: timetableId,
                });
                redirectHandler(AppRoutes.DEFAULT);
            } catch (error) {
                errorHandler(error);
            }
        },
    };
}
