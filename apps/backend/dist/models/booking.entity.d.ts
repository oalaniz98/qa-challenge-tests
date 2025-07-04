import { RoomingList } from './rooming-list.entity';
export declare class Booking {
    bookingId: string;
    hotelId: string;
    eventId: string;
    guestName: string;
    guestPhoneNumber: string;
    checkInDate: Date;
    checkOutDate: Date;
    roomingLists: RoomingList[];
}
