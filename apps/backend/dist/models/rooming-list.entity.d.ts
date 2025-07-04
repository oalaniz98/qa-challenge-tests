import { Booking } from './booking.entity';
export declare enum RoomingListStatus {
    ACTIVE = "Active",
    CLOSED = "Closed",
    CANCELLED = "Cancelled"
}
export declare enum AgreementType {
    LEISURE = "leisure",
    STAFF = "staff",
    ARTIST = "artist"
}
export declare class RoomingList {
    roomingListId: string;
    eventId: string;
    hotelId: string;
    rfpName: string;
    cutOffDate: Date;
    status: RoomingListStatus;
    agreement_type: AgreementType;
    bookings: Booking[];
}
