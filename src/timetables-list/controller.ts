import { fetchers } from '../api/fetchers';
import { TimetablesShortInfo } from '../api/models';
import { AppRoutes } from '../app-routes';

export type TimetablesListControllerDependencies = {
    timetablesFetcher: typeof fetchers.getTimetablesShortInfoList;
    timetablesPresenter: (timetables: TimetablesShortInfo[]) => void;
    errorHandler: (error: Error) => void;
    redirectHandler: (path: string) => void;
};

export function createTimetablesListController({
    timetablesFetcher,
    timetablesPresenter,
    errorHandler,
    redirectHandler,
}: TimetablesListControllerDependencies) {
    return {
        createNewTimetable() {
            redirectHandler(AppRoutes.NEW_TIMETABLE);
        },
        async presentTimetables() {
            try {
                timetablesPresenter(await timetablesFetcher());
            } catch (error) {
                errorHandler(error);
            }
        },
        async deleteTimetable(id: string) {
            console.log(id);
        },
    };
}
