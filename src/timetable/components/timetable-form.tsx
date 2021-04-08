import React, { useCallback, useState } from 'react';
import {
    Box, Button, TextField, Typography,
} from '@material-ui/core';

import { TimetableViewModel } from '../models/timetable-view-model';
import { createSubmitHandler } from '../timetable-controller';

type Props = TimetableViewModel & { onSubmit: ReturnType<typeof createSubmitHandler> };

export const Timetable: React.FC<Props> = ({
    title,
    inputName,
    submitButtonName,
    onSubmit,
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, [setInputValue]);

    const handleSubmit = useCallback(() => {
        onSubmit({ name: inputValue });
    }, [onSubmit, inputValue]);

    return (
        <Box>
            <Typography variant="h3" align="center" color="textPrimary">
                { title }
            </Typography>
            <TextField
                label={ inputName }
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
