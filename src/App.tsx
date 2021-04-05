import React, { useEffect, useState } from 'react';
import {
    Button, CircularProgress, Container, List, ListItem, Typography,
} from '@material-ui/core';

import { fetchers } from './api/fetchers';
import { TimetablesListViewModel } from './view-models/timetables-list-view-model';
import { presentTimetablesList } from './timetables-list-presenter';

function App() {
    const [timetablesListVM, setTimetablesVM] = useState<TimetablesListViewModel | null>(null);

    useEffect(() => {
        async function fetchData() {
            const timetables = await fetchers.getTimetablesShortInfoList();

            setTimetablesVM(presentTimetablesList(timetables));
        }
        fetchData();
    }, []);

    return (
        <Container>
            { timetablesListVM
                ? (
                    <React.Fragment>
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
                        <Button variant="contained" color="primary">
                            { timetablesListVM.createNewTimetableButtonName }
                        </Button>
                    </React.Fragment>
                )
                : (
                    <CircularProgress />
                ) }
        </Container>
    );
}

export default App;
