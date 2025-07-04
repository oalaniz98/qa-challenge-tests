import { BookingService } from '../services/booking.service';
import { BookingDto } from '../dtos/booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(bookingDto: BookingDto): Promise<import("../models/booking.entity").Booking>;
    findAll(): Promise<import("../models/booking.entity").Booking[]>;
    findOne(id: string): Promise<import("../models/booking.entity").Booking>;
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
