import { Timetable } from '../api/models';
import { AppRoutes } from '../app-routes';
import { i18n } from '../i18n';

import { TimetableFormFields } from './models/timetable-form-fields-model';
import { TimetableViewModel } from './models/timetable-view-model';
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
    });
}

export type ErrorHandler = TimetableControllerDeps['errorHandler'];
export type RedirectHandler = TimetableControllerDeps['redirectHandler'];
export type TimetableSaveHandler = TimetableControllerDeps['saveHandler'];
export type TimetableGetter = TimetableControllerDeps['getTimetable'];

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
    const EMPTY_TIMETABLE_VIEW_MODEL: TimetableViewModel = {
        title: i18n.timetableCreationTitle,
        timetableName: {
            label: i18n.timetableNameInput,
            value: '',
        },
        submitButtonName: i18n.timetableSaveButtonName,
    };

    it('should initialize with empty view model when no ID is given', async () => {
        const controller = createMockedTimetableController({});

        const timetableViewModel = await controller.initializeTimetable();

        expect(timetableViewModel).toEqual(EMPTY_TIMETABLE_VIEW_MODEL);
    });

    describe('Given rejecting timetable getter', () => {
        const TIMETABLE_GET_ERROR = new Error('timetable get error');
        let rejectingTimetableGetter: TimetableGetter;

        beforeEach(() => {
            rejectingTimetableGetter = jest.fn(() => Promise.reject(TIMETABLE_GET_ERROR));
        });

        it('should pass error to error handler and return null', async () => {
            const errorHandlerMock: ErrorHandler = jest.fn();

            const controller = createMockedTimetableController({
                getTimetable: rejectingTimetableGetter,
                errorHandler: errorHandlerMock,
            });

            const timetableViewModel = await controller.initializeTimetable('random');

            expect(timetableViewModel).toBeNull();
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

        it('should return view model with values inputs', async () => {
            const controller = createMockedTimetableController({
                getTimetable: resolvingTimetableGetter,
            });

            const timetableViewModel = await controller.initializeTimetable(TIMETABLE.id);

            expect(resolvingTimetableGetter).toHaveBeenCalledWith(TIMETABLE.id);
            expect(timetableViewModel).toEqual({
                ...EMPTY_TIMETABLE_VIEW_MODEL,
                id: TIMETABLE.id,
                timetableName: {
                    ...EMPTY_TIMETABLE_VIEW_MODEL.timetableName,
                    value: TIMETABLE.name,
                },
            });
        });
    });
});
