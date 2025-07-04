"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const booking_entity_1 = require("./models/booking.entity");
const booking_controller_1 = require("./controllers/booking.controller");
const booking_service_1 = require("./services/booking.service");
const config_1 = require("@nestjs/config");
const data_controller_1 = require("./controllers/data.controller");
const data_service_1 = require("./services/data.service");
const common_1 = require("@nestjs/common");
const rooming_list_entity_1 = require("./models/rooming-list.entity");
const rooming_list_controller_1 = require("./controllers/rooming-list.controller");
const rooming_list_service_1 = require("./services/rooming-list.service");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'rooming_list',
                entities: [rooming_list_entity_1.RoomingList, booking_entity_1.Booking],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([rooming_list_entity_1.RoomingList, booking_entity_1.Booking]),
        ],
        controllers: [
            rooming_list_controller_1.RoomingListController,
            booking_controller_1.BookingController,
            data_controller_1.DataController,
        ],
        providers: [
            rooming_list_service_1.RoomingListService,
            booking_service_1.BookingService,
            data_service_1.DataService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map