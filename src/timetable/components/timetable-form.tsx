import React, { useCallback, useState } from 'react';
import {
    Box, Button, TextField, Typography,
} from '@material-ui/core';

import { TimetableFormFields } from '../models/timetable-form-fields-model';
import { TimetableViewModel } from '../models/timetable-view-model';

type Props = TimetableViewModel & {
    onSubmit: (formData: TimetableFormFields, timetableId?: string) => void;
};

export const Timetable: React.FC<Props> = ({
    id,
    title,
    timetableName,
    submitButtonName,
    onSubmit,
}) => {
    const [inputValue, setInputValue] = useState(timetableName.value);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, [setInputValue]);

    const handleSubmit = useCallback(() => {
        onSubmit({ name: inputValue }, id);
    }, [onSubmit, inputValue, id]);

    return (
        <Box>
            <Typography variant="h3" align="center" color="textPrimary">
                { title }
            </Typography>
            <TextField
                label={ timetableName.label }
                variant="outlined"
                fullWidth={ true }
                value={ inputValue }
                onChange={ handleInputChange }
            />
            <Button variant="contained" color="primary" onClick={ handleSubmit }>
                { submitButtonName }
            </Button>
        </Box>
    );
};
