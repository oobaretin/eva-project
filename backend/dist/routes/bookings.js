"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailService_1 = __importDefault(require("../services/emailService"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { service, date, time, customer } = req.body;
        if (!service || !date || !time || !customer) {
            return res.status(400).json({
                success: false,
                message: 'Missing required booking information'
            });
        }
        if (!customer.firstName || !customer.lastName || !customer.email || !customer.phone) {
            return res.status(400).json({
                success: false,
                message: 'Missing required customer information'
            });
        }
        console.log('📅 NEW BOOKING RECEIVED:');
        console.log('=====================================');
        console.log(`👤 Customer: ${customer.firstName} ${customer.lastName}`);
        console.log(`📧 Email: ${customer.email}`);
        console.log(`📞 Phone: ${customer.phone}`);
        console.log(`💇‍♀️ Service: ${service.name}`);
        console.log(`💰 Price: $${service.price}`);
        console.log(`⏱️ Duration: ${service.duration} hours`);
        console.log(`📅 Date: ${new Date(date).toLocaleDateString()}`);
        console.log(`🕐 Time: ${time}`);
        console.log(`📏 Hair Length: ${customer.hairLength || 'Not specified'}`);
        console.log(`🌀 Hair Texture: ${customer.hairTexture || 'Not specified'}`);
        console.log(`🔗 Previous Braids: ${customer.previousBraids ? 'Yes' : 'No'}`);
        console.log(`⚠️ Allergies: ${customer.allergies || 'None'}`);
        console.log(`📝 Notes: ${customer.notes || 'None'}`);
        console.log('=====================================');
        const bookingId = `BK-${Date.now()}`;
        try {
            await emailService_1.default.sendBookingNotification({
                customer,
                service,
                date,
                time
            });
            await emailService_1.default.sendCustomerConfirmation({
                customer,
                service,
                date,
                time
            });
        }
        catch (emailError) {
            console.error('Email sending failed:', emailError);
        }
        return res.json({
            success: true,
            message: 'Booking submitted successfully! We will contact you to confirm your appointment.',
            data: {
                bookingId: bookingId,
                appointmentDate: new Date(date).toISOString(),
                appointmentTime: time,
                serviceName: service.name,
                totalPrice: service.price
            }
        });
    }
    catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to submit booking. Please try again or contact us directly.'
        });
    }
});
router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            data: [],
            message: 'Booking system is active. Check server logs for new bookings.'
        });
    }
    catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings'
        });
    }
});
exports.default = router;
//# sourceMappingURL=bookings.js.map