import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    Typography,
} from '@material-ui/core';

import { fetchers } from './api/fetchers';
import { TimetablesListViewModel } from './view-models/timetables-list-view-model';
import { AppRoutes } from './app-routes';
import { presentTimetablesList } from './timetables-list-presenter';

export const TimetablesList: React.FC = () => {
    const history = useHistory();

    const handleCreateButtonClick = useCallback(() => {
        history.push(AppRoutes.NEW_TIMETABLE);
    }, [history]);

    const [timetablesListVM, setTimetablesVM] = useState<TimetablesListViewModel | null>(null);

    useEffect(() => {
        async function fetchData() {
            const timetables = await fetchers.getTimetablesShortInfoList();

            setTimetablesVM(presentTimetablesList(timetables));
        }
        fetchData();
    }, []);

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
                        <ListItem key={ t.id } button={ true } divider={ true }>
                            { t.name }
                        </ListItem>
                    )) }
                </List>
            ) }
            <Button variant="contained" color="primary" onClick={ handleCreateButtonClick }>
                { timetablesListVM.createNewTimetableButtonName }
            </Button>
        </Box>
    );
};
