import axios from 'axios';

import { TimetablesShortInfo } from './models';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

export const fetchers = {
    async getTimetablesShortInfoList(): Promise<TimetablesShortInfo[]> {
        return (await axiosInstance.get('/timetable')).data;
    },
};
