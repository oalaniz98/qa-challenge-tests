import { DataService } from '../services/data.service';
export declare class DataController {
    private readonly dataService;
    constructor(dataService: DataService);
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
