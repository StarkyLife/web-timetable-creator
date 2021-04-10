import { fetchers } from '../api/fetchers';
import { TimetablesShortInfo } from '../api/models';
import { AppRoutes } from '../app-routes';

export type TimetablesListControllerDependencies = {
    timetablesFetcher: typeof fetchers.getTimetablesShortInfoList;
    timetableDeleteFetcher: typeof fetchers.deleteTimetable;
    timetablesPresenter: (timetables: TimetablesShortInfo[]) => void;
    errorHandler: (error: Error) => void;
    redirectHandler: (path: string) => void;
};

export function createTimetablesListController({
    timetablesFetcher,
    timetableDeleteFetcher,
    timetablesPresenter,
    errorHandler,
    redirectHandler,
}: TimetablesListControllerDependencies) {
    async function loadTimetables() {
        timetablesPresenter(await timetablesFetcher());
    }

    return {
        createNewTimetable() {
            redirectHandler(AppRoutes.NEW_TIMETABLE);
        },
        editExistingTimetable(id: string) {
            redirectHandler(AppRoutes.getExistingTimetablePath(id));
        },
        async initializeTimetablesList() {
            try {
                await loadTimetables();
            } catch (error) {
                errorHandler(error);
            }
        },
        async deleteTimetable(id: string) {
            try {
                await timetableDeleteFetcher(id);
                await loadTimetables();
            } catch (error) {
                errorHandler(error);
            }
        },
    };
}
