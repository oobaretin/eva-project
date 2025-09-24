"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const services_1 = __importDefault(require("./routes/services"));
const appointments_1 = __importDefault(require("./routes/appointments"));
const users_1 = __importDefault(require("./routes/users"));
const admin_1 = __importDefault(require("./routes/admin"));
const payments_1 = __importDefault(require("./routes/payments"));
const bookings_1 = __importDefault(require("./routes/bookings"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
exports.prisma = new client_1.PrismaClient();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'BraidsbyEva API is running',
        braider: {
            name: 'Awa Obaretin',
            phone: '8322079386'
        },
        timestamp: new Date().toISOString()
    });
});
app.use('/api/auth', auth_1.default);
app.use('/api/services', services_1.default);
app.use('/api/appointments', appointments_1.default);
app.use('/api/users', users_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/payments', payments_1.default);
app.use('/api/bookings', bookings_1.default);
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    return res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await exports.prisma.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    await exports.prisma.$disconnect();
    process.exit(0);
});
app.listen(PORT, () => {
    console.log(`🚀 BraidsbyEva API server running on port ${PORT}`);
    console.log(`👩‍🦱 Braider: Awa Obaretin (832-207-9386)`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map