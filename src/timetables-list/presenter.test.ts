import { TimetablesShortInfo } from '../api/models';
import { i18n } from '../i18n';

import { presentTimetablesList } from './presenter';
import { TimetablesListViewModel } from './view-model';

function testTimetablesViewModel(
    timetables: TimetablesShortInfo[] | undefined,
    viewModel: TimetablesListViewModel,
) {
    expect(presentTimetablesList(timetables)).toEqual(viewModel);
}

const defaultEmtpyViewModel: TimetablesListViewModel = {
    title: i18n.timetablesListTitle,
    createNewTimetableButtonName: i18n.createNewTimetableButtonName,
};

it('should not return any timetable given no list', () => {
    testTimetablesViewModel(
        undefined,
        defaultEmtpyViewModel,
    );
});

it('should not return any timetable given empty list', () => {
    testTimetablesViewModel(
        [],
        defaultEmtpyViewModel,
    );
});

it('should list of timetables given timetables', () => {
    const timetablesShortInfo: TimetablesShortInfo[] = [
        { id: '1', name: 'first' },
        { id: '2', name: 'second' },
    ];

    testTimetablesViewModel(
        timetablesShortInfo,
        {
            ...defaultEmtpyViewModel,
            timetables: timetablesShortInfo,
        },
    );
});
