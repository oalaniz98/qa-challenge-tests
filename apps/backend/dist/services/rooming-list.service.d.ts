import { Repository, DataSource } from 'typeorm';
import { RoomingList } from '../models/rooming-list.entity';
import { RoomingListDto } from '../dtos/rooming-list.dto';
export declare class RoomingListService {
    private roomingListRepository;
    private dataSource;
    constructor(roomingListRepository: Repository<RoomingList>, dataSource: DataSource);
    create(roomingListDto: RoomingListDto): Promise<RoomingList>;
    findAll(status?: string, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<RoomingList[]>;
    findOne(id: string): Promise<RoomingList>;
    findBookings(id: string): Promise<import("../models/booking.entity").Booking[]>;
    removeAll(): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
