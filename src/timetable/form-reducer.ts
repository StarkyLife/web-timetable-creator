import { TimetableFormFields } from './models/timetable-form-fields-model';

type SetValueAction = {
    type: 'SET_VALUE';
    key: string;
    value: string;
};

export function setFormValueAC(key: string, value: string): SetValueAction {
    return {
        type: 'SET_VALUE',
        key,
        value,
    };
}

export function timetableFormReducer(
    state: TimetableFormFields,
    action: SetValueAction | undefined,
) {
    switch (action?.type) {
        case 'SET_VALUE':
            return { ...state, [action.key]: action.value };
        default:
            return state;
    }
}
