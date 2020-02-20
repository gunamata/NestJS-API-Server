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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const book_repository_1 = require("../repository/book.repository");
let BookService = class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
        this.logger = new common_1.Logger('BookService');
    }
    async findById(id) {
        return await this.bookRepository.findOne(id);
    }
    async findByfields(options) {
        return await this.bookRepository.findOne(options);
    }
    async findAndCount(options) {
        return await this.bookRepository.findAndCount(options);
    }
    async save(book) {
        return await this.bookRepository.save(book);
    }
    async update(book) {
        return await this.save(book);
    }
    async delete(book) {
        return await this.bookRepository.remove(book);
    }
};
BookService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(book_repository_1.BookRepository)),
    __metadata("design:paramtypes", [book_repository_1.BookRepository])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map