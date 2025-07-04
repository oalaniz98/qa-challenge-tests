import { Repository, DataSource } from 'typeorm';
import { Booking } from '../models/booking.entity';
import { BookingDto } from '../dtos/booking.dto';
export declare class BookingService {
    private bookingRepository;
    private dataSource;
    constructor(bookingRepository: Repository<Booking>, dataSource: DataSource);
    create(bookingDto: BookingDto): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    findOne(id: string): Promise<Booking>;
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
