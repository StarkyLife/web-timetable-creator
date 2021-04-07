import React from 'react';
import {
    Box, Button, TextField, Typography,
} from '@material-ui/core';

import { TimetableViewModel } from './timetable-view-model';

export const Timetable: React.FC<TimetableViewModel> = ({ title, inputName, submitButtonName }) => (
    <Box>
        <Typography variant="h3" align="center" color="textPrimary">
            { title }
        </Typography>
        <TextField label={ inputName } variant="outlined" />
        <Button variant="contained" color="primary">
            { submitButtonName }
        </Button>
    </Box>
);
