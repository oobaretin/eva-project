"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const auth_1 = require("../middleware/auth");
const types_1 = require("../types");
const router = express_1.default.Router();
router.post('/register', async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, phone, hairType, hairLength } = req.body;
        if (!email || !password || !firstName || !lastName) {
            throw new types_1.AppError('Email, password, first name, and last name are required', 400);
        }
        const existingUser = await index_1.prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            throw new types_1.AppError('User with this email already exists', 409);
        }
        const saltRounds = 12;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        const user = await index_1.prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                phone,
                hairType,
                hairLength,
            },
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
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        const response = {
            user,
            token
        };
        res.status(201).json({
            success: true,
            data: response,
            message: 'User registered successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new types_1.AppError('Email and password are required', 400);
        }
        const user = await index_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new types_1.AppError('Invalid email or password', 401);
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        const response = {
            user,
            token
        };
        res.json({
            success: true,
            data: response,
            message: 'Login successful'
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/me', auth_1.authenticateToken, async (req, res, next) => {
    try {
        res.json({
            success: true,
            data: req.user,
            message: 'User profile retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/refresh', auth_1.authenticateToken, async (req, res, next) => {
    try {
        const token = jsonwebtoken_1.default.sign({
            userId: req.user.id,
            email: req.user.email,
            isAdmin: req.user.isAdmin
        }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        res.json({
            success: true,
            data: { token },
            message: 'Token refreshed successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map