import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { NewTimetable } from './timetable/new-timetable-component';
import { TimetablesList } from './timetables-list/timetables-list-component';
import { AppRoutes } from './app-routes';

export const App: React.FC = () => (
    <Container>
        <Switch>
            <Route path={ AppRoutes.DEFAULT } exact={ true }>
                <TimetablesList />
            </Route>
            <Route path={ AppRoutes.NEW_TIMETABLE }>
                <NewTimetable />
            </Route>
        </Switch>
    </Container>
);
