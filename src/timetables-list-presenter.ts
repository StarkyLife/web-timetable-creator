import { TimetablesShortInfo } from './api/models';
import { TimetablesListViewModel } from './view-models/timetables-list-view-model';
import { i18n } from './i18n';

export function presentTimetablesList(
    timetables?: TimetablesShortInfo[],
): TimetablesListViewModel {
    return {
        title: i18n.timetablesListTitle,
        timetables: timetables?.length ? timetables : undefined,
        createNewTimetableButtonName: i18n.createNewTimetableButtonName,
    };
}
