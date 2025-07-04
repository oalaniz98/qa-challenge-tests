import { RoomingListService } from '../services/rooming-list.service';
import { RoomingListDto } from '../dtos/rooming-list.dto';
export declare class RoomingListController {
    private readonly roomingListService;
    constructor(roomingListService: RoomingListService);
    create(roomingListDto: RoomingListDto): Promise<import("../models/rooming-list.entity").RoomingList>;
    findAll(status?: string, search?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<import("../models/rooming-list.entity").RoomingList[]>;
    findOne(id: string): Promise<import("../models/rooming-list.entity").RoomingList>;
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
