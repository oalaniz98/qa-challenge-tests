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
exports.RoomingListService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rooming_list_entity_1 = require("../models/rooming-list.entity");
let RoomingListService = class RoomingListService {
    constructor(roomingListRepository, dataSource) {
        this.roomingListRepository = roomingListRepository;
        this.dataSource = dataSource;
    }
    async create(roomingListDto) {
        const roomingList = this.roomingListRepository.create(roomingListDto);
        return this.roomingListRepository.save(roomingList);
    }
    async findAll(status, search, sortBy = 'cutOffDate', sortOrder = 'ASC') {
        const options = {
            relations: ['bookings'],
        };
        if (status) {
            options.where = {
                status: status,
            };
        }
        if (search) {
            options.where = {
                ...(options.where || {}),
                rfpName: (0, typeorm_2.ILike)(`%${search}%`),
            };
        }
        options.order = {
            [sortBy]: sortOrder,
        };
        return this.roomingListRepository.find(options);
    }
    async findOne(id) {
        return this.roomingListRepository.findOne({
            where: { roomingListId: id },
            relations: ['bookings'],
        });
    }
    async findBookings(id) {
        const roomingList = await this.roomingListRepository.findOne({
            where: { roomingListId: id },
            relations: ['bookings'],
        });
        return roomingList.bookings;
    }
    async removeAll() {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.query('DELETE FROM rooming_list_bookings');
            await queryRunner.query('DELETE FROM rooming_lists');
            await queryRunner.commitTransaction();
            return { success: true, message: 'All rooming lists have been deleted' };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return {
                success: false,
                message: 'Failed to delete rooming lists',
                error: error.message
            };
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.RoomingListService = RoomingListService;
exports.RoomingListService = RoomingListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rooming_list_entity_1.RoomingList)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], RoomingListService);
//# sourceMappingURL=rooming-list.service.js.map