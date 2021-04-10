import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { TimetableContainer } from './timetable/components/timetable-container';
import { AppRoutes } from './app-routes';
import { TimetablesList } from './timetables-list';

export const App: React.FC = () => (
    <Container>
        <Switch>
            <Route path={ AppRoutes.DEFAULT } exact={ true }>
                <TimetablesList />
            </Route>
            <Route path={ AppRoutes.NEW_TIMETABLE }>
                <TimetableContainer />
            </Route>
            <Route path={ AppRoutes.getExistingTimetablePath(':id') }>
                <TimetableContainer />
            </Route>
        </Switch>
    </Container>
);
