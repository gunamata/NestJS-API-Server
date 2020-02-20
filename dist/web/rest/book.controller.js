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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const book_entity_1 = __importDefault(require("../../domain/book.entity"));
const book_service_1 = require("../../service/book.service");
const pagination_entity_1 = require("../../domain/base/pagination.entity");
const header_util_1 = require("../../client/header-util");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
        this.logger = new common_1.Logger('BookController');
    }
    async getAll(req) {
        const pageRequest = new pagination_entity_1.PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.bookService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        header_util_1.HeaderUtil.addPaginationHeaders(req.res, new pagination_entity_1.Page(results, count, pageRequest));
        return results;
    }
    async getOne(id) {
        return await this.bookService.findById(id);
    }
    async post(req, book) {
        const created = await this.bookService.save(book);
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Book', created.id);
        return created;
    }
    async put(req, book) {
        header_util_1.HeaderUtil.addEntityCreatedHeaders(req.res, 'Book', book.id);
        return await this.bookService.update(book);
    }
    async remove(req, id) {
        header_util_1.HeaderUtil.addEntityDeletedHeaders(req.res, 'Book', id);
        const toDelete = await this.bookService.findById(id);
        return await this.bookService.delete(toDelete);
    }
};
__decorate([
    common_1.Get('/'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'List all records',
        type: book_entity_1.default,
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found record',
        type: book_entity_1.default,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getOne", null);
__decorate([
    common_1.Post('/'),
    swagger_1.ApiOperation({ title: 'Create book' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: book_entity_1.default,
    }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_entity_1.default]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "post", null);
__decorate([
    common_1.Put('/'),
    swagger_1.ApiOperation({ title: 'Update book' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: book_entity_1.default,
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_entity_1.default]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "put", null);
__decorate([
    common_1.Delete('/:id'),
    swagger_1.ApiOperation({ title: 'Delete book' }),
    swagger_1.ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    }),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "remove", null);
BookController = __decorate([
    common_1.Controller('api/books'),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    swagger_1.ApiUseTags('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map