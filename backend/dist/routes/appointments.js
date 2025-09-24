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
router.get('/my-appointments', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const appointments = await index_1.prisma.appointment.findMany({
            where: { userId: req.user.id },
            include: {
                service: true
            },
            orderBy: { appointmentDate: 'desc' }
        });
        res.json({
            success: true,
            data: appointments,
            message: 'Appointments retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const appointment = await index_1.prisma.appointment.findUnique({
            where: { id },
            include: {
                service: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true
                    }
                }
            }
        });
        if (!appointment) {
            throw new types_1.AppError('Appointment not found', 404);
        }
        if (appointment.userId !== req.user.id && !req.user.isAdmin) {
            throw new types_1.AppError('Access denied', 403);
        }
        res.json({
            success: true,
            data: appointment,
            message: 'Appointment retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const { serviceId, appointmentDate, paymentMethod, notes, specialRequests } = req.body;
        if (!serviceId || !appointmentDate || !paymentMethod) {
            throw new types_1.AppError('Service ID, appointment date, and payment method are required', 400);
        }
        const service = await index_1.prisma.service.findUnique({
            where: { id: serviceId }
        });
        if (!service || !service.isActive) {
            throw new types_1.AppError('Service not found or inactive', 404);
        }
        const appointmentDateTime = new Date(appointmentDate);
        const now = new Date();
        if (appointmentDateTime <= now) {
            throw new types_1.AppError('Appointment date must be in the future', 400);
        }
        const conflictingAppointment = await index_1.prisma.appointment.findFirst({
            where: {
                appointmentDate: appointmentDateTime,
                status: {
                    in: ['SCHEDULED', 'CONFIRMED']
                }
            }
        });
        if (conflictingAppointment) {
            throw new types_1.AppError('Time slot is already booked', 409);
        }
        const appointment = await index_1.prisma.appointment.create({
            data: {
                userId: req.user.id,
                serviceId,
                appointmentDate: appointmentDateTime,
                paymentMethod,
                totalPrice: service.basePrice,
                notes,
                specialRequests
            },
            include: {
                service: true
            }
        });
        res.status(201).json({
            success: true,
            data: appointment,
            message: 'Appointment created successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.put('/:id', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { appointmentDate, notes, specialRequests, status } = req.body;
        const existingAppointment = await index_1.prisma.appointment.findUnique({
            where: { id }
        });
        if (!existingAppointment) {
            throw new types_1.AppError('Appointment not found', 404);
        }
        if (existingAppointment.userId !== req.user.id && !req.user.isAdmin) {
            throw new types_1.AppError('Access denied', 403);
        }
        if (status && !req.user.isAdmin) {
            throw new types_1.AppError('Only admins can update appointment status', 403);
        }
        const updateData = {};
        if (appointmentDate) {
            const appointmentDateTime = new Date(appointmentDate);
            const now = new Date();
            if (appointmentDateTime <= now) {
                throw new types_1.AppError('Appointment date must be in the future', 400);
            }
            updateData.appointmentDate = appointmentDateTime;
        }
        if (notes !== undefined)
            updateData.notes = notes;
        if (specialRequests !== undefined)
            updateData.specialRequests = specialRequests;
        if (status)
            updateData.status = status;
        const appointment = await index_1.prisma.appointment.update({
            where: { id },
            data: updateData,
            include: {
                service: true
            }
        });
        res.json({
            success: true,
            data: appointment,
            message: 'Appointment updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingAppointment = await index_1.prisma.appointment.findUnique({
            where: { id }
        });
        if (!existingAppointment) {
            throw new types_1.AppError('Appointment not found', 404);
        }
        if (existingAppointment.userId !== req.user.id && !req.user.isAdmin) {
            throw new types_1.AppError('Access denied', 403);
        }
        const now = new Date();
        if (existingAppointment.appointmentDate <= now) {
            throw new types_1.AppError('Cannot cancel past appointments', 400);
        }
        const appointment = await index_1.prisma.appointment.update({
            where: { id },
            data: { status: 'CANCELLED' },
            include: {
                service: true
            }
        });
        res.json({
            success: true,
            data: appointment,
            message: 'Appointment cancelled successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/availability/:date', auth_1.optionalAuth, async (req, res, next) => {
    try {
        const { date } = req.params;
        const requestedDate = new Date(date);
        if (isNaN(requestedDate.getTime())) {
            throw new types_1.AppError('Invalid date format', 400);
        }
        const dayOfWeek = requestedDate.getDay();
        const availability = await index_1.prisma.availability.findFirst({
            where: { dayOfWeek }
        });
        if (!availability || !availability.isAvailable) {
            res.json({
                success: true,
                data: {
                    date: date,
                    timeSlots: []
                },
                message: 'No availability for this date'
            });
            return;
        }
        const timeSlots = [];
        const startTime = parseInt(availability.startTime.split(':')[0]);
        const endTime = parseInt(availability.endTime.split(':')[0]);
        for (let hour = startTime; hour < endTime; hour++) {
            const timeString = `${hour.toString().padStart(2, '0')}:00`;
            const slotDateTime = new Date(requestedDate);
            slotDateTime.setHours(hour, 0, 0, 0);
            const existingAppointment = await index_1.prisma.appointment.findFirst({
                where: {
                    appointmentDate: slotDateTime,
                    status: {
                        in: ['SCHEDULED', 'CONFIRMED']
                    }
                }
            });
            timeSlots.push({
                time: timeString,
                available: !existingAppointment
            });
        }
        const response = {
            date: date,
            timeSlots
        };
        res.json({
            success: true,
            data: response,
            message: 'Availability retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/admin/all', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res, next) => {
    try {
        const { status, date, page = 1, limit = 10 } = req.query;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);
            where.appointmentDate = {
                gte: startDate,
                lt: endDate
            };
        }
        const skip = (Number(page) - 1) * Number(limit);
        const [appointments, total] = await Promise.all([
            index_1.prisma.appointment.findMany({
                where,
                include: {
                    service: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true
                        }
                    }
                },
                orderBy: { appointmentDate: 'asc' },
                skip,
                take: Number(limit)
            }),
            index_1.prisma.appointment.count({ where })
        ]);
        res.json({
            success: true,
            data: {
                appointments,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit))
                }
            },
            message: 'All appointments retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=appointments.js.map