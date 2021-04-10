import React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    List,
    Typography,
} from '@material-ui/core';

import { useTimetablesListController } from './hook';
import { TimetablesListItem } from './timetables-list-item';

export const TimetablesList: React.FC = () => {
    const {
        timetablesListVM,
        handleTimetableCreate,
        handleTimetableEdit,
        handleTimetableDelete,
    } = useTimetablesListController();

    if (!timetablesListVM) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h3" align="center" color="textPrimary">
                { timetablesListVM.title }
            </Typography>
            { !!timetablesListVM.timetables && (
                <List>
                    { timetablesListVM.timetables.map((t) => (
                        <TimetablesListItem
                            key={ t.id }
                            { ...t }
                            onEdit={ handleTimetableEdit }
                            onDelete={ handleTimetableDelete }
                        />
                    )) }
                </List>
            ) }
            <Button variant="contained" color="primary" onClick={ handleTimetableCreate }>
                { timetablesListVM.createNewTimetableButtonName }
            </Button>
        </Box>
    );
};
