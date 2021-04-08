import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { NewTimetable } from './timetable/components/new-timetable';
import { AppRoutes } from './app-routes';
import { TimetablesList } from './timetables-list';

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
