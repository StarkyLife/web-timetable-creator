import { TimetablesShortInfo } from '../api/models';
import { i18n } from '../i18n';

import { TimetablesListViewModel } from './view-model';

export function presentTimetablesList(
    timetables?: TimetablesShortInfo[],
): TimetablesListViewModel {
    return {
        title: i18n.timetablesListTitle,
        timetables: timetables?.length
            ? timetables.map((t) => ({ ...t, deleteButtonName: i18n.timetableDeleteButtonName }))
            : undefined,
        createNewTimetableButtonName: i18n.createNewTimetableButtonName,
    };
}
