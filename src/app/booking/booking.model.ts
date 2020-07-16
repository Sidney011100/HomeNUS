export interface Booking {
    userId: string;
    facility: string;
    date: Date;
    time: string;
    approved?: boolean;
    decided?: boolean;
    pending: boolean;
    facilityId: string;
    dateId: string;
    timeId: string;
    userBookingId?: string;
    purpose: string;
    userName: string;
    nusNetId: string;
}
