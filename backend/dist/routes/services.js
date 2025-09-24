"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const auth_1 = require("../middleware/auth");
const types_1 = require("../types");
const router = express_1.default.Router();
router.get('/', auth_1.optionalAuth, async (req, res, next) => {
    try {
        const services = await index_1.prisma.service.findMany({
            where: { isActive: true },
            orderBy: [
                { category: 'asc' },
                { basePrice: 'asc' }
            ]
        });
        res.json({
            success: true,
            data: services,
            message: 'Services retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', auth_1.optionalAuth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await index_1.prisma.service.findUnique({
            where: { id }
        });
        if (!service) {
            throw new types_1.AppError('Service not found', 404);
        }
        res.json({
            success: true,
            data: service,
            message: 'Service retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/category/:category', auth_1.optionalAuth, async (req, res, next) => {
    try {
        const { category } = req.params;
        const services = await index_1.prisma.service.findMany({
            where: {
                category: category,
                isActive: true
            },
            orderBy: { basePrice: 'asc' }
        });
        res.json({
            success: true,
            data: services,
            message: `Services in ${category} category retrieved successfully`
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res, next) => {
    try {
        const { name, description, duration, basePrice, category, imageUrl } = req.body;
        if (!name || !description || !duration || !basePrice || !category) {
            throw new types_1.AppError('Name, description, duration, basePrice, and category are required', 400);
        }
        const service = await index_1.prisma.service.create({
            data: {
                name,
                description,
                duration: parseInt(duration),
                basePrice: parseFloat(basePrice),
                category,
                imageUrl
            }
        });
        res.status(201).json({
            success: true,
            data: service,
            message: 'Service created successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.put('/:id', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, duration, basePrice, category, imageUrl, isActive } = req.body;
        const existingService = await index_1.prisma.service.findUnique({
            where: { id }
        });
        if (!existingService) {
            throw new types_1.AppError('Service not found', 404);
        }
        const service = await index_1.prisma.service.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(duration && { duration: parseInt(duration) }),
                ...(basePrice && { basePrice: parseFloat(basePrice) }),
                ...(category && { category }),
                ...(imageUrl !== undefined && { imageUrl }),
                ...(isActive !== undefined && { isActive })
            }
        });
        res.json({
            success: true,
            data: service,
            message: 'Service updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingService = await index_1.prisma.service.findUnique({
            where: { id }
        });
        if (!existingService) {
            throw new types_1.AppError('Service not found', 404);
        }
        const service = await index_1.prisma.service.update({
            where: { id },
            data: { isActive: false }
        });
        res.json({
            success: true,
            data: service,
            message: 'Service deactivated successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/meta/categories', auth_1.optionalAuth, async (req, res, next) => {
    try {
        const categories = await index_1.prisma.service.findMany({
            where: { isActive: true },
            select: { category: true },
            distinct: ['category'],
            orderBy: { category: 'asc' }
        });
        const categoryList = categories.map(c => c.category);
        res.json({
            success: true,
            data: categoryList,
            message: 'Service categories retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=services.js.map