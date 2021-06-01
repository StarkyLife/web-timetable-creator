import { EMPTY_TIMETABLE_FORM_FIELDS } from './test-data/form-fields-mocks';
import { timetableFormReducer } from './form-reducer';

it('should return initial state given no action', () => {
    const newState = timetableFormReducer(EMPTY_TIMETABLE_FORM_FIELDS, undefined);

    expect(newState).toEqual(EMPTY_TIMETABLE_FORM_FIELDS);
});

it('should update state with given input\'s value', () => {
    const newState = timetableFormReducer(EMPTY_TIMETABLE_FORM_FIELDS, {
        type: 'SET_VALUE',
        key: 'name',
        value: 'timetable',
    });

    expect(newState).toEqual({
        ...EMPTY_TIMETABLE_FORM_FIELDS,
        name: 'timetable',
    });
});

describe('With existing subject', () => {
    const EXISTING_SUBJECT = { id: 'testId', name: 'existingSubject' };

    it('should add new subjects', () => {
        const newState = timetableFormReducer({
            ...EMPTY_TIMETABLE_FORM_FIELDS,
            subjects: [EXISTING_SUBJECT],
        }, {
            type: 'ADD_SUBJECT',
            subjectName: 'subjectName',
        });

        expect(newState).toEqual<typeof newState>({
            ...EMPTY_TIMETABLE_FORM_FIELDS,
            subjects: [
                EXISTING_SUBJECT,
                { id: expect.any(String), name: 'subjectName' },
            ],
        });
    });

    it('should delete existing subject', () => {
        const newState = timetableFormReducer({
            ...EMPTY_TIMETABLE_FORM_FIELDS,
            subjects: [EXISTING_SUBJECT],
        }, {
            type: 'DELETE_SUBJECT',
            subjectId: EXISTING_SUBJECT.id,
        });

        expect(newState).toEqual<typeof newState>({
            ...EMPTY_TIMETABLE_FORM_FIELDS,
            subjects: [],
        });
    });
});
