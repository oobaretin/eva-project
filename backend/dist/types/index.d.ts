import { Request } from 'express';
import { Prisma } from '@prisma/client';
type User = Prisma.UserGetPayload<{}>;
export interface AuthenticatedRequest extends Request {
    user?: User;
}
export interface JWTPayload {
    userId: string;
    email: string;
    isAdmin: boolean;
    iat?: number;
    exp?: number;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface BookingRequest {
    serviceId: string;
    appointmentDate: string;
    paymentMethod: 'CARD' | 'ZELLE';
    notes?: string;
    specialRequests?: string;
}
export interface TimeSlot {
    time: string;
    available: boolean;
}
export interface AvailabilityResponse {
    date: string;
    timeSlots: TimeSlot[];
}
export interface PaymentIntentRequest {
    amount: number;
    currency: string;
    appointmentId: string;
}
export interface PaymentIntentResponse {
    clientSecret: string;
    paymentIntentId: string;
}
export interface ServiceWithImage {
    id: string;
    name: string;
    description: string;
    duration: number;
    basePrice: number;
    category: string;
    isActive: boolean;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    hairType?: string;
    hairLength?: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface AuthResponse {
    user: Omit<User, 'password'>;
    token: string;
}
export interface DashboardStats {
    totalAppointments: number;
    totalRevenue: number;
    totalClients: number;
    upcomingAppointments: number;
    recentAppointments: any[];
    popularServices: any[];
}
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export {};
//# sourceMappingURL=index.d.ts.map