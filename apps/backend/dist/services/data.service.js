"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rooming_list_entity_1 = require("../models/rooming-list.entity");
const booking_entity_1 = require("../models/booking.entity");
const fs = require("fs");
const path = require("path");
let DataService = class DataService {
    constructor(roomingListRepository, bookingRepository, dataSource) {
        this.roomingListRepository = roomingListRepository;
        this.bookingRepository = bookingRepository;
        this.dataSource = dataSource;
    }
    async importData() {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.query("DELETE FROM rooming_list_bookings");
            await queryRunner.query("DELETE FROM bookings");
            await queryRunner.query("DELETE FROM rooming_lists");
            const roomingListsData = JSON.parse(fs.readFileSync(__dirname + "/../../data/rooming-lists.json", "utf-8"));
            const bookingsData = JSON.parse(fs.readFileSync(path.join(__dirname + "/../../data/bookings.json"), "utf-8"));
            const roomingListBookingsData = JSON.parse(fs.readFileSync(path.join(__dirname + "/../../data/rooming-list-bookings.json"), "utf-8"));
            const bookingIdMap = new Map();
            const roomingListIdMap = new Map();
            const bookings = [];
            for (let i = 0; i < bookingsData.length; i++) {
                const bookingData = bookingsData[i];
                const booking = this.bookingRepository.create({
                    hotelId: bookingData.hotelId,
                    eventId: bookingData.eventId,
                    guestName: bookingData.guestName,
                    guestPhoneNumber: bookingData.guestPhoneNumber,
                    checkInDate: new Date(bookingData.checkInDate),
                    checkOutDate: new Date(bookingData.checkOutDate),
                });
                const savedBooking = await this.bookingRepository.save(booking);
                bookingIdMap.set((i + 1).toString(), savedBooking);
                bookings.push(savedBooking);
            }
            const roomingLists = [];
            for (let i = 0; i < roomingListsData.length; i++) {
                const roomingListData = roomingListsData[i];
                const roomingList = this.roomingListRepository.create({
                    eventId: roomingListData.eventId,
                    hotelId: roomingListData.hotelId,
                    rfpName: roomingListData.rfpName,
                    cutOffDate: new Date(roomingListData.cutOffDate),
                    status: roomingListData.status,
                    agreement_type: roomingListData.agreement_type,
                });
                const savedRoomingList = await this.roomingListRepository.save(roomingList);
                roomingListIdMap.set((i + 1).toString(), savedRoomingList);
                roomingLists.push(savedRoomingList);
            }
            for (const relation of roomingListBookingsData) {
                const roomingList = roomingListIdMap.get(relation.roomingListId);
                const booking = bookingIdMap.get(relation.bookingId);
                if (roomingList && booking) {
                    if (!roomingList.bookings) {
                        roomingList.bookings = [];
                    }
                    roomingList.bookings.push(booking);
                    await this.roomingListRepository.save(roomingList);
                }
            }
            await queryRunner.commitTransaction();
            return { success: true, message: "Data imported successfully" };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("Import error:", error);
            return {
                success: false,
                message: "Failed to import data",
                error: error.message,
            };
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.DataService = DataService;
exports.DataService = DataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rooming_list_entity_1.RoomingList)),
    __param(1, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], DataService);
//# sourceMappingURL=data.service.js.map