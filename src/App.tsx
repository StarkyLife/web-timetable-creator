import {Button, CircularProgress, Container, List, ListItem, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {fetchers} from './api/fetchers';
import {presentTimetablesList} from './timetables-list-presenter';
import {TimetablesListViewModel} from './view-models/timetables-list-view-model';

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
                <>
                  <Typography variant="h3" align="center" color="textPrimary">
                      { timetablesListVM.title }
                  </Typography>
                  { !!timetablesListVM.timetables && (
                      <List>
                          {timetablesListVM.timetables.map(t => (
                              <ListItem key={t.id} button divider>
                                  {t.name}
                              </ListItem>
                          ))}
                      </List>
                  ) }
                  <Button variant="contained" color="primary">
                      {timetablesListVM.createNewTimetableButtonName}
                  </Button>
                </>
              )
              : (
                <CircularProgress />
              )
          }
      </Container>
    );
}

export default App;
