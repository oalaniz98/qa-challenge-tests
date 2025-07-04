import { Repository, DataSource } from "typeorm";
import { RoomingList } from "../models/rooming-list.entity";
import { Booking } from "../models/booking.entity";
export declare class DataService {
    private roomingListRepository;
    private bookingRepository;
    private dataSource;
    constructor(roomingListRepository: Repository<RoomingList>, bookingRepository: Repository<Booking>, dataSource: DataSource);
    importData(): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
