import { TimetablesShortInfo } from '../api/models';
import { AppRoutes } from '../app-routes';

import { createTimetablesListController, TimetablesListControllerDependencies } from './controller';

function createMockedTimetablesController({
    timetablesFetcher,
    timetablesPresenter,
    errorHandler,
    redirectHandler,
}: Partial<TimetablesListControllerDependencies>) {
    return createTimetablesListController({
        timetablesFetcher: timetablesFetcher ?? jest.fn(),
        timetablesPresenter: timetablesPresenter ?? jest.fn(),
        errorHandler: errorHandler ?? jest.fn(),
        redirectHandler: redirectHandler ?? jest.fn(),
    });
}

type Presenter = TimetablesListControllerDependencies['timetablesPresenter'];
type TimetablesFetcher = TimetablesListControllerDependencies['timetablesFetcher'];
type ErrorHandler = TimetablesListControllerDependencies['errorHandler'];

describe('Present timetables', () => {
    describe('Given resolving timetables fetcher', () => {
        const TEST_TIMETABLES_SHORT_INFO: TimetablesShortInfo[] = [
            { id: 'id', name: 'timetable' },
        ];
        let resolvingTimetablesFetcherMock: TimetablesFetcher;

        beforeEach(() => {
            resolvingTimetablesFetcherMock = jest.fn(
                () => Promise.resolve(TEST_TIMETABLES_SHORT_INFO),
            );
        });

        it('should pass fetched data to presenter', async () => {
            const timetablesPresenterMock: Presenter = jest.fn();

            const controller = createMockedTimetablesController({
                timetablesFetcher: resolvingTimetablesFetcherMock,
                timetablesPresenter: timetablesPresenterMock,
            });

            await controller.presentTimetables();

            expect(resolvingTimetablesFetcherMock).toHaveBeenCalled();
            expect(timetablesPresenterMock).toHaveBeenCalledWith(TEST_TIMETABLES_SHORT_INFO);
        });
    });

    describe('Given rejecting timetables fetcher', () => {
        const FETCH_ERROR = new Error('fetch error');
        let rejectingTimetablesFetcherMock: TimetablesFetcher;

        beforeEach(() => {
            rejectingTimetablesFetcherMock = jest.fn(
                () => Promise.reject(FETCH_ERROR),
            );
        });

        it('should pass error to error handler', async () => {
            const errorHandlerMock: ErrorHandler = jest.fn();

            const controller = createMockedTimetablesController({
                timetablesFetcher: rejectingTimetablesFetcherMock,
                errorHandler: errorHandlerMock,
            });

            await controller.presentTimetables();

            expect(errorHandlerMock).toHaveBeenCalledWith(FETCH_ERROR);
        });
    });
});

describe('Create new timetable', () => {
    it('should redirect to timetable creation path', () => {
        const redirectHandlerMock = jest.fn();

        const controller = createMockedTimetablesController({
            redirectHandler: redirectHandlerMock,
        });

        controller.createNewTimetable();

        expect(redirectHandlerMock).toHaveBeenCalledWith(AppRoutes.NEW_TIMETABLE);
    });
});
