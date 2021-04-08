import { TimetablesShortInfo } from '../api/models';
import { AppRoutes } from '../app-routes';

import { createTimetablesListController, TimetablesListControllerDependencies } from './controller';

function createMockedTimetablesController({
    timetablesFetcher,
    timetablesPresenter,
    errorHandler,
    redirectHandler,
    timetableDeleteFetcher,
}: Partial<TimetablesListControllerDependencies>) {
    return createTimetablesListController({
        timetablesFetcher: timetablesFetcher ?? jest.fn(),
        timetablesPresenter: timetablesPresenter ?? jest.fn(),
        errorHandler: errorHandler ?? jest.fn(),
        redirectHandler: redirectHandler ?? jest.fn(),
        timetableDeleteFetcher: timetableDeleteFetcher ?? jest.fn(),
    });
}

type Presenter = TimetablesListControllerDependencies['timetablesPresenter'];
type TimetablesFetcher = TimetablesListControllerDependencies['timetablesFetcher'];
type ErrorHandler = TimetablesListControllerDependencies['errorHandler'];
type RedirectHandler = TimetablesListControllerDependencies['redirectHandler'];
type TimetableDeleteFetcher = TimetablesListControllerDependencies['timetableDeleteFetcher'];

describe('Initialize timetables list', () => {
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

            await controller.initializeTimetablesList();

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

            await controller.initializeTimetablesList();

            expect(errorHandlerMock).toHaveBeenCalledWith(FETCH_ERROR);
        });
    });
});

describe('Create new timetable', () => {
    it('should redirect to timetable creation path', () => {
        const redirectHandlerMock: RedirectHandler = jest.fn();

        const controller = createMockedTimetablesController({
            redirectHandler: redirectHandlerMock,
        });

        controller.createNewTimetable();

        expect(redirectHandlerMock).toHaveBeenCalledWith(AppRoutes.NEW_TIMETABLE);
    });
});

describe('Delete new timetable', () => {
    const TIMETABLE_ID = 'id';

    describe('Given resolving delete fetcher', () => {
        let resolvingTimetableDeleteFetcherMock: TimetableDeleteFetcher = jest.fn();

        beforeEach(() => {
            resolvingTimetableDeleteFetcherMock = jest.fn();
        });

        it('should call delete fetcher with given id and reload timetables', async () => {
            const resolvingTimetablesFetcherMock: TimetablesFetcher = jest.fn(
                () => Promise.resolve([]),
            );
            const presenterMock: Presenter = jest.fn();

            const controller = createMockedTimetablesController({
                timetablesFetcher: resolvingTimetablesFetcherMock,
                timetableDeleteFetcher: resolvingTimetableDeleteFetcherMock,
                timetablesPresenter: presenterMock,
            });

            await controller.deleteTimetable(TIMETABLE_ID);

            expect(resolvingTimetableDeleteFetcherMock).toHaveBeenCalledWith(TIMETABLE_ID);
            expect(resolvingTimetablesFetcherMock).toHaveBeenCalled();
            expect(presenterMock).toHaveBeenCalled();
        });
    });

    describe('Given rejecting delete fetcher', () => {
        const DELETION_ERROR = new Error('deletion error');
        let rejectingTimetableDeleteFetcherMock: TimetableDeleteFetcher;

        beforeEach(() => {
            rejectingTimetableDeleteFetcherMock = jest.fn(() => Promise.reject(DELETION_ERROR));
        });

        it('should pass error to error handler', async () => {
            const errorHandlerMock: ErrorHandler = jest.fn();

            const controller = createMockedTimetablesController({
                timetableDeleteFetcher: rejectingTimetableDeleteFetcherMock,
                errorHandler: errorHandlerMock,
            });

            await controller.deleteTimetable(TIMETABLE_ID);

            expect(errorHandlerMock).toHaveBeenCalledWith(DELETION_ERROR);
        });
    });
});
