import { TimetableFormFields } from './models/timetable-form-fields-model';
import { timetableFormReducer } from './form-reducer';

const INITIAL_STATE: TimetableFormFields = {
    name: '',
};

it('should return initial state given no action', () => {
    const newState = timetableFormReducer(INITIAL_STATE, undefined);

    expect(newState).toEqual(INITIAL_STATE);
});

it('should update state with given input\'s value', () => {
    const newState = timetableFormReducer(INITIAL_STATE, {
        type: 'SET_VALUE',
        key: 'name',
        value: 'timetable',
    });

    expect(newState).toEqual({
        ...INITIAL_STATE,
        name: 'timetable',
    });
});
