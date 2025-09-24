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
router.post('/create-intent', auth_1.authenticateToken, async (req, res, next) => {
    res.status(503).json({
        success: false,
        error: 'Card payments are temporarily unavailable. Please use Zelle payment.',
        message: 'Payment service is being updated'
    });
});
router.post('/confirm', auth_1.authenticateToken, async (req, res, next) => {
    res.status(503).json({
        success: false,
        error: 'Card payments are temporarily unavailable. Please use Zelle payment.',
        message: 'Payment service is being updated'
    });
});
router.get('/status/:appointmentId', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await index_1.prisma.appointment.findUnique({
            where: { id: appointmentId },
            select: {
                id: true,
                userId: true,
                paymentStatus: true,
                paymentMethod: true,
                totalPrice: true,
                stripePaymentId: true
            }
        });
        if (!appointment) {
            throw new types_1.AppError('Appointment not found', 404);
        }
        if (appointment.userId !== req.user.id) {
            throw new types_1.AppError('Access denied', 403);
        }
        let paymentDetails = null;
        if (appointment.paymentMethod === 'CARD') {
            paymentDetails = {
                status: 'service_unavailable',
                message: 'Card payment details are temporarily unavailable'
            };
        }
        res.json({
            success: true,
            data: {
                appointmentId: appointment.id,
                paymentStatus: appointment.paymentStatus,
                paymentMethod: appointment.paymentMethod,
                totalPrice: appointment.totalPrice,
                paymentDetails
            },
            message: 'Payment status retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/webhook', express_1.default.raw({ type: 'application/json' }), async (req, res, next) => {
    res.status(503).json({
        success: false,
        error: 'Webhook service is temporarily unavailable',
        message: 'Payment service is being updated'
    });
});
router.get('/zelle-instructions', (req, res) => {
    res.json({
        success: true,
        data: {
            instructions: [
                '1. Open your Zelle app or online banking',
                '2. Send payment to: (832) 207-9386',
                '3. Include your appointment ID in the memo/note',
                '4. Payment must be completed within 24 hours of booking',
                '5. Contact us if you have any issues with payment'
            ],
            phone: '(832) 207-9386',
            note: 'Include your appointment ID in the payment memo'
        },
        message: 'Zelle payment instructions retrieved successfully'
    });
});
exports.default = router;
//# sourceMappingURL=payments.js.map