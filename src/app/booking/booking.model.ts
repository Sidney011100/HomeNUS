import { Timestamp } from 'rxjs';

export interface Booking {
    userId: string;
    facility: string;
    date: Date;
    time: string;
    approved: boolean;
    facilityId: string;
    dateId: string;
    timeId: string;
    userBookingId?: string;
}
