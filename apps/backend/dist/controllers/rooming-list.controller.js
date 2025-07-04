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
exports.RoomingListController = void 0;
const common_1 = require("@nestjs/common");
const rooming_list_service_1 = require("../services/rooming-list.service");
const rooming_list_dto_1 = require("../dtos/rooming-list.dto");
let RoomingListController = class RoomingListController {
    constructor(roomingListService) {
        this.roomingListService = roomingListService;
    }
    create(roomingListDto) {
        return this.roomingListService.create(roomingListDto);
    }
    findAll(status, search, sortBy, sortOrder) {
        return this.roomingListService.findAll(status, search, sortBy, sortOrder);
    }
    findOne(id) {
        return this.roomingListService.findOne(id);
    }
    findBookings(id) {
        return this.roomingListService.findBookings(id);
    }
    removeAll() {
        return this.roomingListService.removeAll();
    }
};
exports.RoomingListController = RoomingListController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rooming_list_dto_1.RoomingListDto]),
    __metadata("design:returntype", void 0)
], RoomingListController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('sortBy')),
    __param(3, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], RoomingListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomingListController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/bookings'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomingListController.prototype, "findBookings", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomingListController.prototype, "removeAll", null);
exports.RoomingListController = RoomingListController = __decorate([
    (0, common_1.Controller)('rooming-lists'),
    __metadata("design:paramtypes", [rooming_list_service_1.RoomingListService])
], RoomingListController);
//# sourceMappingURL=rooming-list.controller.js.map