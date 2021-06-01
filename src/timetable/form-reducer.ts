import { TimetableFormFields } from './models/timetable-form-fields-model';

export function setFormValueAC(key: keyof TimetableFormFields, value: unknown) {
    return {
        type: 'SET_VALUE' as const,
        key,
        value,
    };
}
export function addSubjectAC(subjectName: string) {
    return {
        type: 'ADD_SUBJECT' as const,
        subjectName,
    };
}
export function deleteSubjectAC(subjectId: string) {
    return {
        type: 'DELETE_SUBJECT' as const,
        subjectId,
    };
}

type Actions = ReturnType<typeof setFormValueAC> |
ReturnType<typeof addSubjectAC> |
ReturnType<typeof deleteSubjectAC>;

// eslint-disable-next-line max-len
// TODO: Редюсер в текущем виде нарушает Open-closed принцип (добавление новых фич модифицирует модуль)

export function timetableFormReducer(
    state: TimetableFormFields,
    action: Actions | undefined,
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
        case 'DELETE_SUBJECT':
            return {
                ...state,
                subjects: state.subjects.filter((s) => s.id !== action.subjectId),
            };

        default:
            return state;
    }
}
