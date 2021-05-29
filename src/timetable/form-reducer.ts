import { TimetableFormFields } from './models/timetable-form-fields-model';

type SetValueAction = {
    type: 'SET_VALUE';
    key: string;
    value: unknown;
};
type AddSubjectAction = {
    type: 'ADD_SUBJECT';
    subjectName: string;
};

export function setFormValueAC(key: keyof TimetableFormFields, value: unknown): SetValueAction {
    return {
        type: 'SET_VALUE',
        key,
        value,
    };
}
export function addSubjectAC(subjectName: string): AddSubjectAction {
    return {
        type: 'ADD_SUBJECT',
        subjectName,
    };
}

export function timetableFormReducer(
    state: TimetableFormFields,
    action: SetValueAction | AddSubjectAction | undefined,
): TimetableFormFields {
    switch (action?.type) {
        case 'SET_VALUE':
            return { ...state, [action.key]: action.value };
        case 'ADD_SUBJECT':
            return {
                ...state,
                subjects: [
                    ...state.subjects,
                    {
                        id: `${action.subjectName}-${Date.now()}`,
                        name: action.subjectName,
                    },
                ],
            };
        default:
            return state;
    }
}
