import { Timetable } from '../api/models';
import { AppRoutes } from '../app-routes';

import { TimetableFormFields } from './models/timetable-form-fields-model';
import {
    createTimetableController,
    TimetableControllerDeps,
} from './timetable-controller';

function createMockedTimetableController(
    deps: Partial<TimetableControllerDeps>,
) {
    return createTimetableController({
        saveHandler: deps.saveHandler ?? jest.fn(),
        getTimetable: deps.getTimetable ?? jest.fn(),
        errorHandler: deps.errorHandler ?? jest.fn(),
        redirectHandler: deps.redirectHandler ?? jest.fn(),
        timetablePresenter: deps.timetablePresenter ?? jest.fn(),
    });
}

type ErrorHandler = TimetableControllerDeps['errorHandler'];
type RedirectHandler = TimetableControllerDeps['redirectHandler'];
type TimetableSaveHandler = TimetableControllerDeps['saveHandler'];
type TimetableGetter = TimetableControllerDeps['getTimetable'];
type TimetablePresenter = TimetableControllerDeps['timetablePresenter'];

const DEFAULT_FORM_DATA: TimetableFormFields = { name: 'timetable' };

describe('Submitting form data', () => {
    describe('Given resolving save handler', () => {
        let resolvingSaveHandlerMock: TimetableSaveHandler;

        beforeEach(() => {
            resolvingSaveHandlerMock = jest.fn(() => Promise.resolve());
        });

        it('should save the form data and redirect to base path', async () => {
            const EXISTING_TIMETABLE_ID = 'id';
            const redirectHandlerMock: RedirectHandler = jest.fn();

            const controller = createMockedTimetableController({
                saveHandler: resolvingSaveHandlerMock,
                redirectHandler: redirectHandlerMock,
            });

            await controller.submit(DEFAULT_FORM_DATA, EXISTING_TIMETABLE_ID);

            expect(resolvingSaveHandlerMock).toHaveBeenCalledWith({
                ...DEFAULT_FORM_DATA,
                id: EXISTING_TIMETABLE_ID,
            });
            expect(redirectHandlerMock).toHaveBeenCalledWith(AppRoutes.DEFAULT);
        });
    });

    describe('Given rejecting save handler', () => {
        const error = new Error('Error on save!');
        let rejectingSaveHandlerMock: TimetableSaveHandler;

        beforeEach(() => {
            rejectingSaveHandlerMock = jest.fn(() => Promise.reject(error));
        });

        it('should pass error to error handler and should not redirect', async () => {
            const errorHandlerMock: ErrorHandler = jest.fn();
            const redirectHandlerMock: RedirectHandler = jest.fn();

            const controller = createMockedTimetableController({
                saveHandler: rejectingSaveHandlerMock,
                errorHandler: errorHandlerMock,
                redirectHandler: redirectHandlerMock,
            });

            await controller.submit(DEFAULT_FORM_DATA);

            expect(errorHandlerMock).toHaveBeenCalledWith(error);
            expect(redirectHandlerMock).not.toHaveBeenCalled();
        });
    });
});

describe('Initialize timetable', () => {
    let timetablePresenterMock: TimetablePresenter;

    beforeEach(() => {
        timetablePresenterMock = jest.fn();
    });

    it('should pass null to presenter given no ID', async () => {
        const controller = createMockedTimetableController({
            timetablePresenter: timetablePresenterMock,
        });

        await controller.initializeTimetable();

        expect(timetablePresenterMock).toHaveBeenCalledWith(null);
    });

    describe('Given rejecting timetable getter', () => {
        const TIMETABLE_GET_ERROR = new Error('timetable get error');
        let rejectingTimetableGetter: TimetableGetter;

        beforeEach(() => {
            rejectingTimetableGetter = jest.fn(() => Promise.reject(TIMETABLE_GET_ERROR));
        });

        it('should pass error to error handler', async () => {
            const errorHandlerMock: ErrorHandler = jest.fn();

            const controller = createMockedTimetableController({
                getTimetable: rejectingTimetableGetter,
                errorHandler: errorHandlerMock,
                timetablePresenter: timetablePresenterMock,
            });

            await controller.initializeTimetable('random');

            expect(timetablePresenterMock).not.toHaveBeenCalled();
            expect(errorHandlerMock).toHaveBeenCalledWith(TIMETABLE_GET_ERROR);
        });
    });

    describe('Given successfully resolving timetable getter', () => {
        const TIMETABLE: Timetable = {
            id: 'id',
            name: 'timetable',
        };
        let resolvingTimetableGetter: TimetableGetter;

        beforeEach(() => {
            resolvingTimetableGetter = jest.fn(() => Promise.resolve(TIMETABLE));
        });

        it('should pass timetable to presenter', async () => {
            const controller = createMockedTimetableController({
                getTimetable: resolvingTimetableGetter,
                timetablePresenter: timetablePresenterMock,
            });

            await controller.initializeTimetable(TIMETABLE.id);

            expect(resolvingTimetableGetter).toHaveBeenCalledWith(TIMETABLE.id);
            expect(timetablePresenterMock).toHaveBeenCalledWith(TIMETABLE);
        });
    });
});
