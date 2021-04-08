import axios from 'axios';

import { Timetable, TimetablesShortInfo } from './models';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

export const fetchers = {
    async getTimetablesShortInfoList(): Promise<TimetablesShortInfo[]> {
        return (await axiosInstance.get('/timetable')).data;
    },
    async saveTimetable(timetable: Timetable): Promise<void> {
        await axiosInstance.post('/timetable', timetable);
    },
    async getTimetable(id: string): Promise<Timetable> {
        return (await axiosInstance.get(`/timetable/${id}`)).data;
    },
    async deleteTimetable(id: string): Promise<void> {
        await axiosInstance.delete(`/timetable/${id}`);
    },
};
