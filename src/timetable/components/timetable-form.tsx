import React, {
    useCallback, useReducer,
} from 'react';
import {
    Box, Button, TextField, Typography,
} from '@material-ui/core';

import { setFormValueAC, timetableFormReducer } from '../form-reducer';
import { TimetableFormFields } from '../models/timetable-form-fields-model';
import { TimetableViewModel } from '../models/timetable-view-model';

type Props = TimetableViewModel & {
    onSubmit: (formData: TimetableFormFields, timetableId?: string) => void;
};

export const Timetable: React.FC<Props> = ({
    id,
    title,
    formData,
    timetableNameInput,
    // newSubjectInput,
    submitButtonName,
    onSubmit,
}) => {
    const [state, dispatch] = useReducer(timetableFormReducer, formData);

    const handleSubmit = useCallback(() => {
        onSubmit(state, id);
    }, [onSubmit, state, id]);

    return (
        <Box>
            <Typography variant="h3" align="center" color="textPrimary">
                { title }
            </Typography>
            <TextField
                label={ timetableNameInput.label }
                variant="outlined"
                fullWidth={ true }
                value={ state.name }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(setFormValueAC('name', e.target.value));
                } }
            />
            { /* <TextField */ }
            { /*     label={ newSubjectInput.label } */ }
            { /*     variant="outlined" */ }
            { /*     fullWidth={ true } */ }
            { /*     value={ inputValue } */ }
            { /*     onChange={ handleInputChange } */ }
            { /* /> */ }
            <Button variant="contained" color="primary" onClick={ handleSubmit }>
                { submitButtonName }
            </Button>
        </Box>
    );
};
