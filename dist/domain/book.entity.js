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
/* eslint-disable @typescript-eslint/no-unused-vars */
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
/**
 * A Book.
 */
let Book = class Book extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'title' }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ name: 'author' }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    typeorm_1.Column({ name: 'isbn' }),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    typeorm_1.Column({ type: 'numeric', name: 'price' }),
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', name: 'published' }),
    __metadata("design:type", Object)
], Book.prototype, "published", void 0);
Book = __decorate([
    typeorm_1.Entity('book')
], Book);
exports.default = Book;
//# sourceMappingURL=book.entity.js.map