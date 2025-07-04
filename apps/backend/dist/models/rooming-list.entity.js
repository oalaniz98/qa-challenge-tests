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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomingList = exports.AgreementType = exports.RoomingListStatus = void 0;
const typeorm_1 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
var RoomingListStatus;
(function (RoomingListStatus) {
    RoomingListStatus["ACTIVE"] = "Active";
    RoomingListStatus["CLOSED"] = "Closed";
    RoomingListStatus["CANCELLED"] = "Cancelled";
})(RoomingListStatus || (exports.RoomingListStatus = RoomingListStatus = {}));
var AgreementType;
(function (AgreementType) {
    AgreementType["LEISURE"] = "leisure";
    AgreementType["STAFF"] = "staff";
    AgreementType["ARTIST"] = "artist";
})(AgreementType || (exports.AgreementType = AgreementType = {}));
let RoomingList = class RoomingList {
};
exports.RoomingList = RoomingList;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoomingList.prototype, "roomingListId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomingList.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomingList.prototype, "hotelId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomingList.prototype, "rfpName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], RoomingList.prototype, "cutOffDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RoomingListStatus,
        default: RoomingListStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], RoomingList.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AgreementType,
    }),
    __metadata("design:type", String)
], RoomingList.prototype, "agreement_type", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => booking_entity_1.Booking, booking => booking.roomingLists),
    (0, typeorm_1.JoinTable)({
        name: 'rooming_list_bookings',
        joinColumn: {
            name: 'roomingListId',
            referencedColumnName: 'roomingListId',
        },
        inverseJoinColumn: {
            name: 'bookingId',
            referencedColumnName: 'bookingId',
        },
    }),
    __metadata("design:type", Array)
], RoomingList.prototype, "bookings", void 0);
exports.RoomingList = RoomingList = __decorate([
    (0, typeorm_1.Entity)('rooming_lists')
], RoomingList);
//# sourceMappingURL=rooming-list.entity.js.map