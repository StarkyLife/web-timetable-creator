// import { AppRoutes } from '../app-routes';

import { AppRoutes } from '../app-routes';

import {
    createSubmitHandler,
    TimetableSubmitErrorHandler,
    TimetableSubmitRedirectHandler,
    TimetableSubmitSaveHandler,
} from './timetable-controller';
import { TimetableFormFields } from './timetable-form-fields-model';

const DEFAULT_FORM_DATA: TimetableFormFields = { name: 'timetable' };

function createAndSubmit(
    saveHandler: TimetableSubmitSaveHandler,
    errorHandler: TimetableSubmitErrorHandler,
    redirectHandler: TimetableSubmitRedirectHandler,
    submittedData: TimetableFormFields,
) {
    const sumbitHandler = createSubmitHandler(
        saveHandler,
        errorHandler,
        redirectHandler,
    );

    return sumbitHandler(submittedData);
}

describe('Given error and redirect handlers', () => {
    let errorHandlerMock: TimetableSubmitErrorHandler;
    let redirectHandlerMock: TimetableSubmitRedirectHandler;

    beforeEach(() => {
        errorHandlerMock = jest.fn();
        redirectHandlerMock = jest.fn();
    });

    describe('Given resolving save handler', () => {
        let resolvingSaveHandlerMock: TimetableSubmitSaveHandler;

        beforeEach(() => {
            resolvingSaveHandlerMock = jest.fn(() => Promise.resolve());
        });

        it('should save the form data and redirect to base path', async () => {
            await createAndSubmit(
                resolvingSaveHandlerMock,
                errorHandlerMock,
                redirectHandlerMock,
                DEFAULT_FORM_DATA,
            );

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
            await createAndSubmit(
                rejectingSaveHandlerMock,
                errorHandlerMock,
                redirectHandlerMock,
                DEFAULT_FORM_DATA,
            );

            expect(errorHandlerMock).toHaveBeenCalledWith(error);
            expect(redirectHandlerMock).not.toHaveBeenCalled();
        });
    });
});
