import { Timestamp } from 'rxjs';

export interface Booking {
    location: string;
    user: string;
    block: string;
    capacity: number;
    date: Date;
    time: string;
    approved: boolean;
}
