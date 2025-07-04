import { AgreementType, RoomingListStatus } from '../models/rooming-list.entity';
export declare class RoomingListDto {
    eventId: string;
    hotelId: string;
    rfpName: string;
    cutOffDate: string;
    status: RoomingListStatus;
    agreement_type: AgreementType;
}
