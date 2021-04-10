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
        errorHandler: deps.errorHandler ?? jest.fn(),
        redirectHandler: deps.redirectHandler ?? jest.fn(),
    });
}

export type TimetableSubmitErrorHandler = TimetableControllerDeps['errorHandler'];
export type TimetableSubmitRedirectHandler = TimetableControllerDeps['redirectHandler'];
export type TimetableSubmitSaveHandler = TimetableControllerDeps['saveHandler'];

const DEFAULT_FORM_DATA: TimetableFormFields = { name: 'timetable' };

describe('Submitting form data', () => {
    describe('Given resolving save handler', () => {
        let resolvingSaveHandlerMock: TimetableSubmitSaveHandler;

        beforeEach(() => {
            resolvingSaveHandlerMock = jest.fn(() => Promise.resolve());
        });

        it('should save the form data and redirect to base path', async () => {
            const redirectHandlerMock: TimetableSubmitRedirectHandler = jest.fn();

            const controller = createMockedTimetableController({
                saveHandler: resolvingSaveHandlerMock,
                redirectHandler: redirectHandlerMock,
            });

            await controller.submit(DEFAULT_FORM_DATA);

            expect(resolvingSaveHandlerMock).toHaveBeenCalledWith(DEFAULT_FORM_DATA);
            expect(redirectHandlerMock).toHaveBeenCalledWith(AppRoutes.DEFAULT);
        });
    });

    describe('Given rejecting save handler', () => {
        const error = new Error('Error on save!');
        let rejectingSaveHandlerMock: TimetableSubmitSaveHandler;

        beforeEach(() => {
            rejectingSaveHandlerMock = jest.fn(() => Promise.reject(error));
        });

        it('should pass error to error handler and should not redirect', async () => {
            const errorHandlerMock: TimetableSubmitErrorHandler = jest.fn();
            const redirectHandlerMock: TimetableSubmitRedirectHandler = jest.fn();

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
