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
router.get('/profile', auth_1.authenticateToken, async (req, res, next) => {
    try {
        res.json({
            success: true,
            data: req.user,
            message: 'Profile retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.put('/profile', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const { firstName, lastName, phone, hairType, hairLength, preferences } = req.body;
        const updateData = {};
        if (firstName)
            updateData.firstName = firstName;
        if (lastName)
            updateData.lastName = lastName;
        if (phone)
            updateData.phone = phone;
        if (hairType)
            updateData.hairType = hairType;
        if (hairLength)
            updateData.hairLength = hairLength;
        if (preferences)
            updateData.preferences = preferences;
        const user = await index_1.prisma.user.update({
            where: { id: req.user.id },
            data: updateData,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                hairType: true,
                hairLength: true,
                preferences: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true
            }
        });
        res.json({
            success: true,
            data: user,
            message: 'Profile updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/appointments', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const { status, limit = 10 } = req.query;
        const where = { userId: req.user.id };
        if (status) {
            where.status = status;
        }
        const appointments = await index_1.prisma.appointment.findMany({
            where,
            include: {
                service: true
            },
            orderBy: { appointmentDate: 'desc' },
            take: Number(limit)
        });
        res.json({
            success: true,
            data: appointments,
            message: 'Appointment history retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/reviews', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const reviews = await index_1.prisma.review.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            data: reviews,
            message: 'Reviews retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/reviews', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        if (!rating || rating < 1 || rating > 5) {
            throw new types_1.AppError('Rating must be between 1 and 5', 400);
        }
        const completedAppointments = await index_1.prisma.appointment.count({
            where: {
                userId: req.user.id,
                status: 'COMPLETED'
            }
        });
        if (completedAppointments === 0) {
            throw new types_1.AppError('You must have completed appointments to leave a review', 400);
        }
        const existingReview = await index_1.prisma.review.findFirst({
            where: { userId: req.user.id }
        });
        if (existingReview) {
            throw new types_1.AppError('You have already left a review', 409);
        }
        const review = await index_1.prisma.review.create({
            data: {
                userId: req.user.id,
                rating,
                comment
            }
        });
        res.status(201).json({
            success: true,
            data: review,
            message: 'Review created successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map